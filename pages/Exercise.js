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
import { useNavigation } from '@react-navigation/native';

export default function Exercises ( { navigation }) {
  const [lastActivity, setLastActivity] = useState({ distance: 0, time: 0 });
  const [goal, setGoal] = useState(60); //Example goal in minutes - Justin
  const [weeklyTracker, setWeeklyTracker] = useState(Array(7).fill(0));

  useEffect(() => {
    //Load last activity from local storage or any storage - Justin
    const loadLastActivity = () => {
      //Example numbers - Justin
      setLastActivity({ distance: 3.5, time: 45 }); //distance in miles, time in minutes - Justin
    };

    loadLastActivity();
  }, []);

  const totalWeeklyTime = weeklyTracker.reduce((a, b) => a + b, 0);
  const percentage = (totalWeeklyTime / goal) * 100;

  return (
    <ScrollView>
      <Button title="Start Exercise" color= '#24A866' style={styles.button} onPress={() => navigation.navigate('ExerciseTracker')}/>

      <View style={styles.gridContainer}>
        <View style={styles.section}>
          <View style={styles.col1}>
            <Text style={styles.header}>Recent</Text>
            <View style={styles.box}>
              <Text>Walk</Text>
              <Text>{lastActivity.distance} miles</Text>
            </View>
            <View style={styles.box}>
              <Text>Time</Text>
              <Text>{lastActivity.time} minutes</Text>
            </View>
          </View>
          <View style={styles.col1}>
            <View style={styles.pictureBox}>
              <Image source={require('../images/ucf_map.jpg')} style={{width:240, height: 240}}></Image>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.col1}>
            <Text style={styles.header}>Goals</Text>
            <View style={styles.box}>
              <Text>Goal: {goal} minutes</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View styles={styles.col2}>
            <Text style={styles.header}>Weekly Tracker</Text>
            <View style={styles.box}>
              {weeklyTracker.map((time, index) => (
                <Text key={index}>Day {index + 1}: {time} minutes</Text>
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
    flex: 2,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
    width: 200,
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
  pictureBox: {
    height: 260,
    width: 260,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 30,
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
});
