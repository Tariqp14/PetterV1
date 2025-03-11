import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { saveExerciseData } from '../config/ExerciseStats';

const ExerciseTracker = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState('');

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100); // 100 milliseconds
      }, 100);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = async () => {
    setIsActive(false);

    if (distance) {
      const minutes = Math.floor((time / 60000) % 60);

      try {
        await saveExerciseData({
          distance: parseFloat(distance),
          time: minutes,
        });
        alert(`You walked ${distance} miles in ${minutes} minutes.`);
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
    backgroundColor: '#fff',
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
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default ExerciseTracker;

/*import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { saveExerciseData } from '../config/ExerciseStats';

const ExerciseTracker = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState('');
  
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100); //100 milliseconds every interval - Justin
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
    //Where the data can be called and store (hopefully) - Justin
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
    backgroundColor: '#fff',
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
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default ExerciseTracker;*/