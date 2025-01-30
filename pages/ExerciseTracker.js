import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const ExerciseTracker = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState('');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); //increment time by 1 second - Justin
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setDistance('');
  };

  const handleSubmit = () => {
    //Save the distance and time to local storage or state management - Justin
    console.log(`Logged Distance: ${distance} miles, Time: ${time} seconds`);
    handleReset();
    navigation.goBack();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Tracking</Text>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        {!isActive ? (
          <Button title="Start" onPress={handleStart} />
        ) : (
          <Button title="Stop" onPress={handleStop} />
        )}
        <Button title="Save" onPress={handleSubmit} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter distance in miles"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  time: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default ExerciseTracker;