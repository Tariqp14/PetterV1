import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { saveExerciseData } from '../config/ExerciseStats';

const ExerciseTracker = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleSave = async () => {
    if (distance) {
      const timeInSeconds = Math.round(time / 1000);
      const timeInMinutes = timeInSeconds / 60;
  
      try {
        await saveExerciseData({
          distance: parseFloat(distance),
          time: timeInMinutes,
        });
        navigation.goBack();
      } catch (error) {
        console.error('Failed to save exercise data:', error);
      }
    } else {
      alert('Please enter distance.');
    }
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

  const handleDismissKeyboard = () => {
    Keyboard.dismiss(); 
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
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
          <Button title="Save" onPress={handleSave} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter distance in miles"
          keyboardType="numeric"
          value={distance}
          onChangeText={setDistance}
          onSubmitEditing={handleDismissKeyboard}
        />

        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  time: {
    fontSize: 48,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ExerciseTracker;