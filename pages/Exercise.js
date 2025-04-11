import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { BarChart } from 'react-native-chart-kit';
import { getWeeklyData, getRecentActivity } from '../config/ExerciseStats';


export default function Exercises ( { navigation }) {
  const [recentActivity, setRecentActivity] = useState({
    distance: 0,
    time: 0,
  });
  const [goalTime, setGoalTime] = useState(60); // Goal in minutes
  const [weeklyData, setWeeklyData] = useState(Array(7).fill(0));
  const [scaleAnim] = useState(new Animated.Value(1)); // New animated value for scaling the progress circle
  
  const formatTime = (timeInMinutes) => {
    const minutes = Math.floor(timeInMinutes);  // Get full minutes
    const seconds = Math.round((timeInMinutes % 1) * 60);  // Get the fractional part as seconds and round to the nearest second
    const decimalSeconds = minutes + (seconds/100)
  
    return `${decimalSeconds} minutes`;
  };

  // Initializes pet profiles
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  // Pulse animation function -- ChatGPT recommendation for completion
  const triggerGoalAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2, // Scale up to 120%
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Scale back to normal
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Calls pet profiles
  useEffect(() => {
    if (auth.currentUser) {
      const petsRef = collection(db, "users", auth.currentUser.uid, "pets");
      const unsubscribe = onSnapshot(petsRef, (snapshot) => {
        const petProfiles = [];
        snapshot.forEach((doc) => {
          petProfiles.push({ id: doc.id, ...doc.data() });
        });
        setPets(petProfiles);
        if (!selectedPet && petProfiles.length > 0) {
          setSelectedPet(petProfiles[0]);
        }
      });
      return () => unsubscribe();
    }
  }, [auth.currentUser]);

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const data = await getWeeklyData();
        const processedData = Array(7).fill(0);
        if (data.length > 0) {
          data.forEach((item) => {
            const dayIndex = new Date(item.date.toDate()).getDay();
            const timeInMinutes = item.time;
            processedData[dayIndex] += timeInMinutes;
          });
        }
        setWeeklyData(processedData);

        // Load recent activity from Firebase
        const lastActivity = await getRecentActivity();
        if (lastActivity) {
          setRecentActivity(lastActivity);
        } else {
        // Set default values for a new user
          setRecentActivity({ distance: 0, time: 0 });
        }
      };

      loadData();
    }, []) // Empty array means it only runs on screen focus
  );

  const totalWeeklyTime = weeklyData
    .map(time => parseFloat(formatTime(time))) 
    .reduce((acc, curr) => acc + curr, 0);
  const totalTimeTracked = Math.min(totalWeeklyTime.toFixed(2), goalTime); // Cap number at Goal time
  const rawProgress = (totalTimeTracked / goalTime) * 100;
  const cappedProgress = Math.min(rawProgress, 100); // Clamp to 100%
  const roundedProgress = parseFloat(cappedProgress.toFixed(2));
  const timeLeft = Math.max(goalTime - totalTimeTracked, 0); // Clamp at 0

  // Trigger animation when the goal is reached
  useEffect(() => {
    if (roundedProgress >= 100) {
      triggerGoalAnimation();
    }
  }, [roundedProgress]);

  return (
    <ScrollView>
      <View style={styles.gridContainer}>
        <View style={styles.petSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pets.length > 0
            ? pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                onPress={() => setSelectedPet(pet)}
                style={[
                  styles.petButton,
                  selectedPet &&
                  selectedPet.id === pet.id &&
                  styles.activePetButton,
                ]}
              >
                <Text
                  style={[
                    styles.petText,
                    selectedPet &&
                    selectedPet.id === pet.id &&
                    styles.activePetText,
                  ]}
                >
                  {pet.Name}
                </Text>
              </TouchableOpacity>
            ))
            : ["Dog", "Cat"].map((pet) => (
              <TouchableOpacity
                key={pet}
                onPress={() =>
                  setSelectedPet({ Name: pet, petType: pet.toLowerCase() })
                }
                style={[
                  styles.petButton,
                  selectedPet &&
                  selectedPet.Name === pet &&
                  styles.activePetButton,
                ]}
              >
                <Text
                  style={[
                    styles.petText,
                    selectedPet &&
                    selectedPet.Name === pet &&
                    styles.activePetText,
                  ]}
                >
                  {pet}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => navigation.navigate('ExerciseTracker')}
        >
          <Text style={styles.buttonText}>Start Exercise</Text>
        </TouchableOpacity>
      </View>

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
              <Text>{formatTime(recentActivity.time)}</Text>
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
            <View style={styles.goalContainer}>
              <View style={styles.exerciseBox}>
                <View style={styles.exerciseContainer}>
                  <View style={styles.exerciseTextContainer}>
                    <Text style={styles.subHeader}>
                      {selectedPet ? selectedPet.Name : 'Pet'}
                    </Text>
                    <Text style={styles.textPercentage}>{roundedProgress}%</Text>
                    <View style={styles.progressBarCircle}>
                      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <AnimatedCircularProgress
                          size={100}
                          width={10}
                          backgroundWidth={0}
                          fill={roundedProgress}
                          tintColor="#B8917A"
                          tintColorSecondary="#524136"
                          backgroundColor="#F5F5F5"
                          arcSweepAngle={270}
                          rotation={225}
                          lineCap="round"
                          duration={1000}
                        />
                      </Animated.View>
                    </View>
                    <Text style={{textAlign: 'center'}}>
                      {totalTimeTracked} min / {goalTime} min
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.exerciseBox}>
                <View style={styles.exerciseContainer}>
                  <View style={styles.exerciseTextContainer}>
                    <Text style={styles.subHeader}>You've Got This!</Text>
                    <Text style={{ textAlign: 'center' }}>
                      You have spent {totalTimeTracked} out of {goalTime} minutes exercising 
                    </Text>
                    <Text style={styles.miniText}>
                      {timeLeft} minutes to go
                    </Text>
                  </View>
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
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}: {formatTime(time)}
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
    padding: 10,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  col1: {
    flex: 1,
    marginHorizontal: 5,
  },
  col2: {
    flex: 2,
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#24A866',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box: {
    flex: 1,
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
    elevation: 3,
  },
  goalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'stretch',
    marginBottom: 10,
  },
  exerciseBox:{
    flex: 1,
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
  //Temporary style while we make the app more dynamic
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
  /*chartBox: {
    height: 250,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },*/
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
  petButton: {
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activePetButton: {
    borderBottomColor: "green",
  },
  petText: {
    fontSize: 16,
    color: "black",
  },
  activePetText: {
    fontWeight: "bold",
    color: "black",
  },
  petSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});