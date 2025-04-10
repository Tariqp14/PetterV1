import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Animated, useAnimatedValue } from 'react-native';

export const MealTimeCard = ({ timestamp }) => {
  if (!timestamp) return <View> </View>
  let date = timestamp?.toDate()
  let hours = date?.getHours()
  let minutes = date?.getMinutes()
  date = date?.toLocaleTimeString()
  let currentTime = new Date()
  let hoursAway = currentTime.getHours() - hours
  const [isFed, setIsFed] = useState(false);
  const fadeAnim = useAnimatedValue(1);
  useEffect(() => {

  }, [fadeAnim]);
  function toggleCard() {
    setIsFed(!isFed)
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }
  return (
    <View>
      {isFed
        ?
        <Animated.View style={[styles.mealtimebox2, { opacity: fadeAnim, }]}  >
          <Text style={styles.boldtext}>Well Fed!</Text>
        </Animated.View>
        :
        <View style={styles.mealtimebox}>
          <Text style={styles.lighttext}>Meal</Text>
          <Text style={styles.boldtext}>{date?.toString()}</Text>
          <Text>{`${hoursAway} hours away`}</Text>
          <Pressable style={styles.button} onPress={toggleCard}>
            <Text style={styles.whitetext}>Feed Now</Text>
          </Pressable>
        </View>
      }
    </View>

  );
};

const styles = StyleSheet.create({

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
  boldtext: {
    fontWeight: 600,
    fontSize: 20
  },
  whitetext: {
    color: "white"
  },
  button: {
    backgroundColor: "#24A866",
    padding: 10,
    borderRadius: 6,
  },

})





