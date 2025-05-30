import React, { useState, useEffect, } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, Modal, ScrollView, TextInput, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MealTimeCard } from './MealTimeCard';
import { useNavigation, useRoute } from '@react-navigation/native'
import { FeedForm } from '../components/FeedForm';
import { db, auth } from '../config/firebase.js';
import { collection, getDocs, query, where, updateDoc, onSnapshot, } 
from "firebase/firestore";


async function addPetData(values) {
  if (!auth.currentUser) return;

  const petsQuery = query(
    collection(db, "users", auth.currentUser.uid, "pets"),
    where("Name", "==", values.pet)
  );
  // Execute the query and get the results
  const snapshot = await getDocs(petsQuery);

  const currentPet = snapshot.docs[0]
  // console.log("currentPet", currentPet.ref)
  const newData = {
    feedingTimes:
    {
      foodType: values.foodType,
      notes: values.notes,
      foodBrand: values.foodBrand,
      first: values.first,
      second: values.second,
      third: values.third,
      amount: values.amount,
      timesPerDay: values.timesPerDay

    }
  }
  const updatedPetData = {
    ...currentPet.data(),
    ...newData
  }
  await updateDoc(currentPet.ref, updatedPetData)
  return true
}

async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const data = querySnapshot.docs.map((doc) => {
    return doc.data()
  });
  return data;
}


async function getUser() {
  const usersRef = collection(db, "users");
  const id = auth.currentUser()
  // Create a query against the collection.
  const q = query(usersRef, where(documentId(), "==", id));
  return q
}


async function hasPets(pets) {
  if (!pets) {
    return false
  }
  if (pets.length === 0) {

    return false

  }
  else {
    return true
  }

}

export default function Feed() {
  const navigation = useNavigation();
  const route = useRoute();
  const [pets, setPets] = useState([]);
  const [isNewFeed, setNewFeed] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null)

  async function getPets() {
    if (!auth.currentUser) return;

    try {
      const petsQuery = query(
        collection(db, "users", auth.currentUser.uid, "pets")
      );
      return onSnapshot(petsQuery, (querySnapshot) => {
        // Execute the query and get the results
        const data = querySnapshot.docs.map((doc) => {
          let objectData = doc.data()
          return Object.assign(objectData, { id: doc.id })
        });
        setPets(data)
      });
    } catch (error) {
      console.log('Error getting pets:', error);
    }
  };

  function newFeed() {
    setNewFeed(!isNewFeed)
  }
  async function addFeedTime(values) {
    // setFormData(values)
    const success = await addPetData(values)
    if (success) {
      setNewFeed(false)
    }

  }
  useEffect(() => {
    if (!hasPets(pets)) {
      Alert.alert('No pet profile found', '', [
        {
          text: 'Add Pet Profile', onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Profiles' }],
          })
        },

        {
          text: 'Cancel',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Profiles' }],
          })
        },

      ]);
    }
    else {
    // Check if a pet was passed from Home screen
    const petFromHome = route.params?.selectedPet;
      
    if (petFromHome) {
      // Find the matching pet in our pets array
      const matchingPet = pets.find(pet => pet.id === petFromHome.id);
      if (matchingPet) {
        setSelectedPet(matchingPet);
      } else {
        setSelectedPet(pets[0]); // Fallback to first pet
      }
    } else {
      setSelectedPet(pets[0]); // No pet passed, use first pet
    }
  }
}, [pets, route.params]);

  useEffect(() => {
    async function getData() {
      const unsubscribe = await getPets()
      const products = await getProducts()
      setProducts(products)
      setSelectedProduct(Math.floor(Math.random() * products.length))
      return unsubscribe

    }
    const unsubscribe = getData()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={selectedPet?.feedingTimes ? styles.section1 : styles.section1b}>
        {/* previous Header - can delete */}
        {/* <View style={styles.sub}>
          <Text style={styles.title}>Feeding Schedule</Text>
          <View>
            <Image style={styles.profileimage} source={require("../assets/images/profile.png")}>

            </Image>
          </View>
        </View> */}

        <ScrollView horizontal={true} contentContainerStyle={styles.items}>
          {pets.map((pet) => {
            return <Pressable key={pet?.Name} onPress={() => setSelectedPet(pet)}>
              <Text style={[styles.subheading1, selectedPet == pet && styles.underlineText, selectedPet == pet && styles.selectedPetText]}>{pet?.Name}</Text>
            </Pressable>
          })}

        </ScrollView>
          <View style={styles.addfeedbutton}>
        <Pressable style={styles.newfeedtime} onPress={newFeed}>
          <AntDesign style={styles.iconplus} name="plus" size={18} color="grey" />
          <Text style={styles.subheading3}>Add New Feed Time</Text>
        </Pressable>
        </View>
        <Modal
          animationType="slide"
          visible={isNewFeed}
          onRequestClose={() => {
            setNewFeed(!isNewFeed);
          }}>

          <SafeAreaView style={styles.modalView}>
            <View style={styles.feedheading}>
            <Pressable style={styles.cancelButton} onPress={newFeed}>
                <Text style={styles.feedfont2}>Cancel</Text>
              </Pressable>
              <Text style={styles.feedfontTitle}>New Feed Time</Text>
              <View style={{width: 65}}></View>
              {/* <Pressable>
                <Text style={styles.feedfont}>Add</Text>
              </Pressable> */}
            </View>

            <FeedForm pets={pets} onSubmit={addFeedTime}></FeedForm>
          </SafeAreaView>
        </Modal>
      </View>
      <ScrollView style={styles.mainContentScroll}>
      {selectedPet?.feedingTimes && <View style={styles.section2}>
          <View style={styles.editFood}>
            <Text style={styles.subheading}>Food Info</Text>
            <Pressable onPress={newFeed} ><Text style={styles.edit}>Edit</Text></Pressable>
          </View>
          <View style={styles.petfoodbox}>
            <View style={styles.coloredLine1}></View>
            <View>
              <Text>{selectedPet?.feedingTimes?.foodType}</Text>
              {/* <Text style={styles.lighttext}>Life Protection Formula</Text> */}
            </View>
          </View>

          <View style={styles.petmealboxes}>
            <View style={styles.petfoodbox}>
              <View style={styles.coloredLine2}></View>
              <Text>{selectedPet?.feedingTimes?.amount}</Text>
            </View>

            <View style={styles.petfoodbox}>
              <View style={styles.coloredLine3}></View>
              <Text>{selectedPet?.feedingTimes?.timesPerDay} Meals per Day</Text>
            </View>
          </View>
        </View>
      }

      {
        selectedPet?.feedingTimes && <View style={styles.section3}>
          <Text style={styles.subheading}>Meal Times</Text>
          <View style={styles.petmealboxes}>
            <MealTimeCard timestamp={selectedPet?.feedingTimes?.first} ></MealTimeCard>

            <MealTimeCard timestamp={selectedPet?.feedingTimes?.second} ></MealTimeCard>
          </View>
        </View >
      }

      <View style={styles.section4}>
        <Text style={styles.subheading}>Buy More</Text>

        <View style={styles.petfoodbox}>
          <View>
            <Image style={styles.foodimage} source={{ uri: products[selectedProduct]?.image }} />
      
          </View>

          <View style={styles.productTitle}>
            <Text>{products[selectedProduct]?.name}</Text>
            <Text style={styles.lighttext}>{products[selectedProduct]?.description}</Text>
          </View>

          <View>
            <View style={styles.fivestars}>
              {Array.from({ length: Math.round(products[selectedProduct]?.rating) }).map((_, index) => {
                return <FontAwesome key={index} style={styles.staricon} name="star" size={15} color="#FFC440" />;
              })}
            </View>
            <Text style={styles.alignright}>{products[selectedProduct]?.price}</Text>
          </View>


        </View>
      </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  section1: {
    flex: 0,
    padding: 10,
    gap: 20,
    justifyContent: "flex-start",

  },

  section1b: {
    flex: 0,
    padding: 10,
    gap: 20,
    justifyContent: "flex-start",

  },
  section2: {
    flex: 3,
    // borderColor: "black",
    // borderWidth: 1,
    padding: 10,
    gap: 20,
  },
  section3: {
    flex: 3,
    // borderColor: "black",
    // borderWidth: 1,
    padding: 10,
    gap: 20,

  },
  section4: {
    flex: 2,
    // borderColor: "black",
    // borderWidth: 1,
    padding: 10,
    gap: 20,
    marginTop: 10,

  },

  title: {
    fontSize: 26,
    fontWeight: 500,
    fontFamily: "Inter"

  },

  subheading: {
    fontSize: 18,
    fontWeight: 500,

  },

  subheading3: {
    fontSize: 15,
    fontWeight: 300,


  },
  mainContentScroll: {
    flex: 1,
  },

  // Underlined pet name in subheading
  subheading1: {
    fontSize: 16,
    fontWeight: 400,

  },

  underlineText: {
    borderBottomColor: "#24A866",
    borderBottomWidth: 2,

  },

  //
  sub: {
    flexDirection: "row",
  },

  newfeedtime: {
    flexDirection: "row",
    alignItems: "center",
  },

  feedfontTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Added new feed time icon
  iconplus: {
    marginRight: 5,
  },
  addfeedbutton:{
    marginLeft:10,
    paddingVertical:10
  },
  // The click to edit dog food times 
  editFood: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  edit: {
    fontSize: 12,
  },

  petfoodbox: {
    backgroundColor: "#FCFDFE",
    shadowColor: "black",
    shadowOpacity: .3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 3,
    borderRadius: 6,
    padding: 20,
    flexDirection: "row",
    alignItems: "center"
  },



  lighttext: {
    fontFamily: "Inter",
    fontWeight: 300,
  },

  petmealboxes: {
    flexDirection: "row",
    gap: 20,

  },
  fivestars: {
    flexDirection: "row"

  },

  alignright: {
    textAlign: "right"
  },
  foodimage: {
    resizeMode: "contain",
    aspectRatio: 1,
    width: 50,
    margin: 10,

  },
  boldtext: {
    fontWeight: 600,
    fontSize: 20
  },

  whitetext: {
    color: "white"
  },

  profileimage: {
    resizeMode: "contain",
    height: 30,
  },

  modalView: {

    backgroundColor: "#E8E8E8",
    padding: 75,
    paddingTop: 100,
    height: "93%",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  feedheading: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    marginTop:25
  },
  cancelButton: {
    paddingLeft:10,
  },
  feedinfo: {
    gap: 10,
    padding: 20,
    minWidth: "90%",
  },
  feedfont: {
    fontSize: 16,
  },
  feedboxes: {
    backgroundColor: "#F9F9F9",
    borderRadius: 6,
    shadowColor: "black",
    shadowOpacity: .3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    padding: 10,
    height: 54,
    paddingTop: 24,

  },
  feedboxesLabel: {
    fontSize: 12,
    color: "#979797",
    top: 24,
    zIndex: 100,
    left: 10,

  },
  feedfont2: {
    color: "red",
    fontSize: 18,
  },

  times: {
    gap: 10,
    marginTop: 10,
  },
  pickerstyle: {
    height: "30%",



  },

  plusborder: {
    backgroundColor: "#F9F9F9",
    borderRadius: 3,
    padding: 6,
    shadowColor: "black",
    shadowOpacity: .1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    justifyContent: "center",
  },

  feedtimes: {
    backgroundColor: "#F9F9F9",
    borderRadius: 3,
    padding: 9,
    shadowColor: "black",
    shadowOpacity: .1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    gap: 9,
    marginRight: 20,

  },

  timeboxesLabel: {
    fontSize: 12,
    color: "#979797",
  },
  pickerItem: {
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  dropDownBox: {
    backgroundColor: "#F9F9F9",
    shadowColor: "black",
    shadowOpacity: .3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderRadius: 6,
    height: 55,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",


  },

  productTitle: {
    width: "60%",
  },

  items: {
    gap: 20,
    marginLeft: 10,
    paddingTop:10
  },
  coloredLine1: {
    width: 3,
    backgroundColor: '#24A866',
    height: 24,
    borderRadius: 7,
    marginRight: 20,

  },
  coloredLine2: {
    width: 3,
    backgroundColor: '#FEC34E',
    height: 24,
    borderRadius: 7,
    marginRight: 20,

  },
  coloredLine3: {
    width: 3,
    backgroundColor: '#B8917A',
    height: 24,
    borderRadius: 7,
    marginRight: 20,

  },
  selectedPetText: {
  fontWeight: 'bold', // Bold weight for selected item
},
});

