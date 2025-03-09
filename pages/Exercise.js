/*
These are the dependencies I install everytime I clone the repository for some reason/used AI to help with the basis
of the code and had me download the top two - Justin

npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
npx expo install react-dom react-native-web @expo/metro-runtime
*/

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Exercises ( { navigation }) {
  const [recentActivity, setRecentActivity] = useState({
    distance: 0,
    time: 0,
  });
  const [goalTime, setGoalTime] = useState(60); //Goal in minutes - Justin
  const [weeklyData, setWeeklyData] = useState(Array(7).fill(0));

  useEffect(() => {
    //Temp data - Justin
    const lastActivity = {
      distance: 3, // miles
      time: 30, // minutes
    };
    setRecentActivity(lastActivity);

    // Simulating weekly data
    const weeklyTime = [30, 45, 20, 0, 60, 15, 75]; //Temp data in minutes for each day - Justin
    setWeeklyData(weeklyTime);
  }, []);

  const totalWeeklyTime = weeklyData.reduce((acc, curr) => acc + curr, 0);
  const timeLeft = goalTime - recentActivity.time;
  const progress = (recentActivity.time/goalTime) *100;

  return (
    <ScrollView>
      <Button title="Start Exercise" color= '#24A866' style={styles.button} onPress={() => navigation.navigate('ExerciseTracker')}/>

      <View style={styles.gridContainer}>
        <View style={styles.section}>
          <View style={styles.col1}>
            <Text style={styles.header}>Recent</Text>
            <View style={styles.box}>
              <Text>Walk</Text>
              <Text>{recentActivity.distance} miles</Text>
            </View>
            <View style={styles.box}>
              <Text>Time</Text>
              <Text>{recentActivity.time} minutes</Text>
            </View>
          </View>
          <View style={styles.col1}>
            <View style={styles.pictureBox}>
              <Image source={require('../images/ucf_map.jpg')} style={{width:160, height: 160}}></Image>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.col1}>
            <Text style={styles.header}>Goals</Text>
            <View style={styles.exerciseBox}>
              <View style={styles.exerciseContainer}>
                <View style={styles.exerciseTextContainer}>
                  <Text style={styles.subHeader}>Coco</Text>
                  <Text style={styles.textPercentage}>{progress}%</Text>
                  <View style={styles.progressBarCircle}>
                    <AnimatedCircularProgress
                      size={100}
                      width={10}
                      backgroundWidth={0}
                      fill={progress}
                      tintColor="#B8917A"
                      tintColorSecondary="#524136"
                      backgroundColor="#F5F5F5"
                      arcSweepAngle={270}
                      rotation={225}
                      lineCap="round"
                      duration={1000}
                    />
                  </View>
                  <Text>{recentActivity.time} min / {goalTime} min</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.col1}>
            <View style={styles.exerciseBox}>
              <View style={styles.exerciseContainer}>
                <View style={styles.exerciseTextContainer}>
                  <Text style={styles.subHeader}>You've Got This!</Text>
                  <Text style={{textAlign: 'center'}}>
                    You have spent {recentActivity.time} min
                    out of {goalTime} min exercising 
                  </Text>
                  <Text style={styles.miniText}>
                    {timeLeft} min to go
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View styles={styles.col2}>
            <Text style={styles.header}>Weekly Tracker</Text>
            <View style={styles.box}>
              {weeklyData.map((time, index) => (
              <Text key={index}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}: {time} minutes
              </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flexDirection: 'row',
  },
  col1: {
    flex: 1,
  },
  col2: {
    flex: 2,
  },
  box: {
    width: 150,
    height: 'auto',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  exerciseBox:{
    position:"relative",
    flexDirection:'column', 
    shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .1,
        shadowRadius: 3,
        elevation: 2,
        borderWidth: 0,
        borderColor: '#ddd',
        borderRadius: 6,
        paddingVertical:14,
        paddingHorizontal:25,
        backgroundColor: 'white',
        fontSize: 16,
        marginTop:5,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'space-evenly',
        minWidth:"35%",
        margin:10,
  },
  exerciseContainer:{
    flexDirection:"row",
    justifyContent:'space-evenly',
    gap:14
  },
  exerciseTextContainer:{
    textAlign:"center",
    alignItems:"center",
    justifyContent:'center'
  },
  progressBarCircle:{
    marginTop:10,
    marginBottom:0,
    paddingBottom:0,
  },
  //Temporary style while we make the app more dynamic - Justin
  tempBox: {
    width: 150,
    height: 'auto',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 95,
    margin: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  pictureBox: {
    height: 180,
    width: 180,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 40,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  //Temporary style while we make the app more dynamic - Justin
  tempPictureBox: {
    height: 180,
    width: 180,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 40,
    marginLeft: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  header: {
    fontSize: 24,
    margin: 10,
  },
  subHeader: {
    fontSize: 15,
    textAlign: 'center',
    margin: '5',
  },
  miniText: {
    fontSize: 10,
    textAlign: 'center',
    margin: 5,
  },
  textPercentage:{
    position:'absolute',
    top:0,
    marginTop:"70%"
  },
});