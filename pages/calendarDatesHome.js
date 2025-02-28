import React, {useRef, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import { getDate } from '../timelineEvents';


export default function MyWeeklyCalendar () {
    return (
      // view for if we need to change the padding in the future. 
      <View style = {{flex:1}}> 
      <CalendarProvider date={getDate()} style = {styles.container} >
        <WeekCalendar style = {styles.calendar}
         firstDay={1}
         markedDates={{ '2025-01-28': { marked: true } }}
         allowShadow={false}
         theme={{
          calendarBackground: 'white', // Changes the background color of the calendar
          selectedDayBackgroundColor: '#FFD885',
          selectedDayTextColor: '#000000',
          todayTextColor: '#B8917A',
          dayTextColor: '#2d4150',
          textDisabledColor: '#DBD9D9',
          dotColor:'#24A866',
          arrowColor:'black',
          dotStyle: {marginTop: -1},
          selectedDotColor: '',
          textDayFontWeight: '400',
          disabledDotColor: '#E9E9E9',
            }
        }
        />
      </CalendarProvider>
      </View>
    );
  }
 
  const styles = StyleSheet.create({

    calendar:{
      backgroundColor:'white',
    },
    container:{
      backgroundColor:'white',
    }
  })