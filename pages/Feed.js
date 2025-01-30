import React, { useState, } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function Feed() {
  const [isFed, setIsFed] = useState(false);
  const [isNewFeed, setNewFeed] = useState(false);
  function toggleCard() {
    setIsFed(!isFed)
  }
  function newFeed() {
    setNewFeed(!isNewFeed)
  }
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
          <Text style={styles.subheading1}>Coco</Text>
          <Text style={styles.subheading}>Mr Whiskers</Text>
          <Text></Text>
        </View>





        <Pressable style={styles.newfeedtime} onPress={newFeed}>
          <AntDesign style={styles.iconplus} name="plus" size={18} color="grey" />
          <Text style={styles.subheading3}>Add New Feed Time</Text>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isNewFeed}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setNewFeed(!isNewFeed);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setNewFeed(!isNewFeed)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
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
          {isFed
            ?
            <View style={styles.mealtimebox2}>
              <Text style={styles.boldtext}>Well Fed!</Text>
            </View>
            :
            <View style={styles.mealtimebox}>
              <Text style={styles.lighttext}>First Meal</Text>
              <Text style={styles.boldtext}>11:30 am</Text>
              <Text>3 hours away</Text>
              <Pressable style={styles.button} onPress={toggleCard}>
                <Text style={styles.whitetext}>Feed Now</Text>
              </Pressable>
            </View>
          }


          <View style={styles.mealtimebox}>
            <Text style={styles.lighttext}>Second Meal</Text>
            <Text style={styles.boldtext}>4:30 pm</Text>
            <Text>7 hours away</Text>
          </View>

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
    textDecorationLine: "underline",
    textDecorationColor: "#24A866",
    textDecorationStyle: "solid",

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

  mealtimebox: {
    backgroundColor: "#FCFDFE",
    shadowColor: "black",
    shadowOpacity: .3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    borderRadius: 6,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6
  },

  mealtimebox2: {
    backgroundColor: "#4DD791",
    shadowColor: "black",
    shadowOpacity: .3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    borderRadius: 6,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 6
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
  button: {
    backgroundColor: "#24A866",
    padding: 10,
    borderRadius: 6,
  },

  whitetext: {
    color: "white"
  },

  profileimage: {
    resizeMode: "contain",
    height: 30,
  }


});

