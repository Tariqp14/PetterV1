import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import MyWeeklyCalendar from './calendarDatesHome';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { db, auth } from '../config/firebase.js';
import { collection, query, onSnapshot, } from "firebase/firestore";



// used ai to help with navigation to calender screen

export default function HomeScreen() {
  const [headerTextLayout, setHeaderTextLayout] = useState(null);
  const [pets, setPets] = useState([]);
  const navigation = useNavigation();
  const graphColors = [
    { main: "#B8917A", secondary: "#524136" },  // Brown
    { main: "#FFD885", secondary: "#998250" },  // Gold
    { main: "#A9DFBF", secondary: "#27AE60" },  // Green
    { main: "#85C1E9", secondary: "#2874A6" },  // Blue
    { main: "#D7BDE2", secondary: "#8E44AD" }   // Purple
  ];
  
  console.log("Home Rendered")
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
        console.log(data)
      });
    } catch (error) {
      console.log('Error getting pets:', error);
    }
  };

  useEffect(() => {
    async function getData() {
      await getPets()
    }
    getData()
  }, [])

  return (
    <ScrollView 
    style={styles.scrollView} 
    contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
      <View style={styles.calHeaderTextContainer}>
        <Text
          style={styles.calendarHeaderText}
          onLayout={(event) => {
            const { y, height } = event.nativeEvent.layout;
            setHeaderTextLayout({ y, height });
          }}
        >
          You have 1 event today
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('timelineCalendarScreen')}>
          <Text style={styles.buttonText}> View Events </Text>
        </TouchableOpacity>
      </View>
      {/* calendar component */}
      <MyWeeklyCalendar />
        <View style={styles.infoContainer}>
          <View style={styles.infoTextHeaderContainer}>
            <Text style={styles.infoTextHeader}>Today's Info</Text>
            <TouchableOpacity style={styles.buttonText} onPress={() => navigation.navigate('timelineCalendarScreen')}>
              <Text style={styles.buttonText}> </Text>
            </TouchableOpacity>
          </View>
          {/* Feeding buttons*/}
          {pets.map((pet, index) => (
            <TouchableOpacity 
              key={pet.id || index} 
              style={styles.feedButtons} 
              onPress={() => navigation.navigate('Feed', { selectedPet: pet })}
            >
              <View style={styles.coloredLine}></View>
              <View style={styles.feedTextContainer}>
                <View>
                  <Text style={styles.feedText}>{pet?.Name || "Unnamed Pet"}</Text>
                  <Text style={styles.feedTextSmall}>{pet?.feedingTimes?.foodBrand || "No Food Brand Yet"}</Text>
                </View>
                <Text style={styles.feedTextTime}>
                {pet?.feedingTimes?.first?.toDate ? 
                  pet.feedingTimes.first.toDate().toLocaleTimeString("en-US", {
                    //options to take away the extra seconds on the time. 
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 
                  "No time set"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          {/* Exercise Section */}
          <Text style={styles.exerciseTextHeader}>Exercise Goals</Text>
          <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}>
          <View style={styles.exerciseButtonsContainer}>
            {pets.length > 0 ? (
              // Map through pets array to create buttons (limit to 2 if needed)
              pets.map((pet, index) => (
                <TouchableOpacity 
                  key={pet.id || index} 
                  style={styles.exerciseButtons} 
                  onPress={() => navigation.navigate('Exercises',{ selectedPet: pet })}
                >
                  <View style={styles.exerciseTextContainer}>
                    <Text style={styles.exerciseTextTitle}>{pet?.Name || "Unnamed Pet"}</Text>
                    <Text style={styles.exerciseTextPercentage}>30%</Text>
                    <View style={styles.progressBarCircle}>
                      <AnimatedCircularProgress
                        size={100}
                        width={10}
                        backgroundWidth={0}
                        fill={index % 2 === 0 ? 40 : 30}
                        tintColor={graphColors[index % graphColors.length].main}
                        tintColorSecondary={graphColors[index % graphColors.length].secondary}
                        backgroundColor="#F5F5F5"
                        arcSweepAngle={270}
                        rotation={225}
                        lineCap="round"
                        duration={1000}
                      />
                    </View>
                    <Text style={styles.exerciseTextFraction}>30min / {index % 2 === 0 ? "2" : "1"}Hrs</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              // Fallback when no pets are available
              <Text>No pets available for exercise tracking</Text>
            )}
          </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    //flex: 1,
    backgroundColor: 'white',
    paddingBottom:20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    //flexDirection:"row",
    //position: 'absolute',
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  infoTextHeaderContainer: {
    //position:'absolute',
    flexDirection: "row",
    gap: 230,
    marginBottom: 10,
    //right:0,
    // left:0,
  },
  infoTextHeader: {
    textAlign: "left",
    alignSelf: "flex-start",
    fontSize: 22,
    fontWeight: "400"
  },

  // to algin and space out calendar header content 
  calHeaderTextContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    alignSelf: "flex-start",
    paddingHorizontal: 20,

  },
  calendarHeaderText: {
    color: 'black',
    marginVertical: 15,
    fontSize: 16,
    fontWeight: '700',
    alignSelf: "flex-start",

  },
  button: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 0,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  progressBarCircle: {
    marginTop: 10,
    marginBottom: 0,
    paddingBottom: 0,
  },
  feedButtons: {
    position: "relative",
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 0,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    fontSize: 16,
    marginTop: 10,
    //textAlign:'center',
    alignItems: 'center',
    //justifyContent:'center',
    width: "100%",
    marginBottom: 10,
  },
  horizontalScroll:{
    paddingHorizontal: 5,
  paddingBottom: 10,
  },
  exerciseButtonsContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    gap: 14,

  },
  exerciseButtons: {
    position: "relative",
    flexDirection: 'column',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 0,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    //minWidth: "35%",
    width: 160,
    marginBottom: 10,
  },
  exerciseTextHeader: {
    fontSize: 18,
    fontWeight: "400",
    marginVertical: 19,
  },
  exerciseTextTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  exerciseTextPercentage: {
    position: 'absolute',
    top: 0,
    marginTop: "65%"

  },
  exerciseTextFraction: {

  },
  buttonText: {
    alignSelf: "flex-end",
    textAlign: "right"
  },
  feedText: {
    fontSize: 16
  },
  feedTextTime: {
    fontSize: 20,
    fontWeight: '500',
    //marginLeft:80,
    textAlign: "right"
  },
  feedTextSmall: {
    fontSize: 14,
    fontWeight: "300"
  },
  feedTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coloredLine: {
    width: 3,
    backgroundColor: '#24A866',
    height: 30,
    borderRadius: 7,
    marginRight: 20,

  },
  exerciseTextContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: 'center'
  }
});