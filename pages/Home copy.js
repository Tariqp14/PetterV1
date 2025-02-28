import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MyWeeklyCalendar from './calendarDatesHome';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

// used ai to help with navigation to calender screen

export default function HomeScreen() {
  const [headerTextLayout, setHeaderTextLayout] = useState(null);
  const navigation = useNavigation();
  console.log("Home Rendered")
  return (
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
          <Text style={styles.buttonText}> Full Calendar</Text>
        </TouchableOpacity>
      </View>
      {/* calendar component */}
      <MyWeeklyCalendar/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer:{
    flexDirection:"row",
    position:'absolute',
    alignItems:"flex-end",
    justifyContent:"space-between",
    left:20,
    right:20,
    
  },
  infoTextHeader:{
  textAlign:"left",
  alignSelf:"flex-start",
  fontSize:20,
  fontWeight:"400"
  },
  // to algin and space out calendar header content 
  calHeaderTextContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "flex-start",
    gap: 80,
  },
  calendarHeaderText: {
    color: 'black',
    marginVertical:15,
    fontSize: 16,
    fontWeight: '700',
    alignSelf:"flex-start",
    marginLeft: 20,
  },
  button:{
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
  buttonText:{
    alignSelf:"flex-end",
    
  }
});