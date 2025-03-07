import React, { useState, useEffect, } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, Modal, ScrollView, TextInput, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { TimePicker } from './TimePicker';
import { MealTimeCard } from './MealTimeCard';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native'
import { FeedForm } from '../components/FeedForm';
import { db } from '../config/firebase.js';
import { collection, getDocs } from "firebase/firestore";

async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

const pets = ["Coco", "Mr Whiskers"];

export default function Feed() {
  const navigation = useNavigation();
  const [hasPet, setHasPet] = useState(true);
  const [isNewFeed, setNewFeed] = useState(false);
  const [selectedPet, setSelectedPet] = useState(pets[0]);
  const [dropDownVisible, setdropDownVisible] = useState(false);

  function toggledropDownVisible() {
    setdropDownVisible(!dropDownVisible)
  }
  function newFeed() {
    setNewFeed(!isNewFeed)
  }

  useEffect(() => {
    if (!hasPet) {
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


    getProducts()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section1}>
        <View style={styles.sub}>
          <Text style={styles.title}>Feeding Schedule</Text>
          <View>
            <Image style={styles.profileimage} source={require("../assets/images/profile.png")}>

            </Image>
          </View>
        </View>

        <View style={styles.sub}>
          <Pressable onPress={() => setSelectedPet(pets[0])}>
            <Text style={[styles.subheading1, selectedPet == pets[0] && styles.underlineText]}>{pets[0]}</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedPet(pets[1])}>
            <Text style={[styles.subheading, selectedPet == pets[1] && styles.underlineText]}>{pets[1]}</Text>
          </Pressable>
          <Text></Text>
        </View>

        <Pressable style={styles.newfeedtime} onPress={newFeed}>
          <AntDesign style={styles.iconplus} name="plus" size={18} color="grey" />
          <Text style={styles.subheading3}>Add New Feed Time</Text>
        </Pressable>

        <Modal
          animationType="slide"
          visible={isNewFeed}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setNewFeed(!isNewFeed);
          }}>

          <SafeAreaView style={styles.modalView}>
            <View style={styles.feedheading}>
              <Pressable onPress={newFeed}>
                <Text style={styles.feedfont2}>Cancel</Text>
              </Pressable>
              <Text style={styles.feedfont}>Add New Feed Time</Text>
              <Pressable>
                <Text style={styles.feedfont}>Add</Text>
              </Pressable>

            </View>

            <FeedForm onSubmit={(values) => console.log(values)}></FeedForm>
          </SafeAreaView>

        </Modal>
      </View>
      <View style={styles.section2}>
        <View style={styles.editFood}>
          <Text style={styles.subheading}>Food Info</Text>
          <Text style={styles.edit}>Edit</Text>
        </View>
        <View style={styles.petfoodbox}>
          <View>
            <Text>Blue Buffalo</Text>
            <Text style={styles.lighttext}>Life Protection Formula</Text>
          </View>
        </View>

        <View style={styles.petmealboxes}>
          <View style={styles.petfoodbox}>
            <Text>2 Cups</Text>
          </View>

          <View style={styles.petfoodbox}>
            <Text>2 Meals per Day</Text>
          </View>
        </View>
      </View>

      <View style={styles.section3}>
        <Text style={styles.subheading}>Meal Times</Text>
        <View style={styles.petmealboxes}>
          <MealTimeCard></MealTimeCard>

          <MealTimeCard></MealTimeCard>
        </View>
      </View >

      <View style={styles.section4}>
        <Text style={styles.subheading}>Buy More</Text>

        <View style={styles.petfoodbox}>
          <View>
            <Image style={styles.foodimage} source={require("../assets/images/dogfood.png")}>
            </Image>

          </View>

          <View>
            <Text>Blue Buffalo Life</Text>
            <Text style={styles.lighttext}>30 lb bag</Text>
          </View>

          <View>
            <View style={styles.fivestars}>
              <FontAwesome style={styles.staricon} name="star" size={15} color="#FFC440" />
              <FontAwesome style={styles.staricon} name="star" size={15} color="#FFC440" />
              <FontAwesome style={styles.staricon} name="star" size={15} color="#FFC440" />
              <FontAwesome style={styles.staricon} name="star" size={15} color="#FFC440" />
              <FontAwesome style={styles.staricon} name="star" size={15} color="#FFC440" />
            </View>
            <Text style={styles.alignright}>$16.33</Text>
          </View>


        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  section1: {
    flex: 2,
    // borderColor: "black",
    // borderWidth: 1,
    padding: 10,
    gap: 20,
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

  // Underlined pet name in subheading
  subheading1: {
    fontSize: 18,
    fontWeight: 500,

  },

  underlineText: {
    borderBottomColor: "#24A866",
    borderBottomWidth: 3,

  },

  //
  sub: {
    flexDirection: "row",
    justifyContent: "space-between"

  },

  newfeedtime: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Added new feed time icon
  iconplus: {
    marginRight: 5,

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
    shadowRadius: 4,
    borderRadius: 6,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
    height: 40

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
    fontSize: 16,
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


  }
});

