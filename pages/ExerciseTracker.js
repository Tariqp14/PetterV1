import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const ExerciseTracker = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState('');
  
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100); // increment time by 100ms
      }, 100);
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
    // Here you would normally save the data to local storage or a database
    alert(`You walked ${distance} miles in ${formatTime(time)}.`); 
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setDistance('');
  };

  const formatTime = (time) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Tracker</Text>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        {!isActive && time === 0 ? (
          <Button title="Start" onPress={handleStart} />
        ) : isActive ? (
          <Button title="Stop" onPress={handleStop} />
        ) : (
          <Button title="Resume" onPress={handleStart} />
        )}
        <Button title="Reset" onPress={handleReset} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter distance in miles"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />

      <Button title="Back" onPress={() => navigation.navigate('Exercises')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
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