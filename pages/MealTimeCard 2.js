import React, { useState, } from 'react';
import { Text, View, StyleSheet, Pressable, } from 'react-native';

export const MealTimeCard = () => {
  const [isFed, setIsFed] = useState(false);
  function toggleCard() {
    setIsFed(!isFed)
  }
  return (
    <View>
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





