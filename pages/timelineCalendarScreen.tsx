import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import find from 'lodash/find';
import AddEventForm from './eventForm';



import React, {Component} from 'react';
import {Alert, SafeAreaView, StyleSheet,Text,Modal,Button,View,TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native';
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from 'react-native-calendars';
import {MaterialIcons} from '@expo/vector-icons'

import { timelineEvents,getDate, addTimelineEvent } from '../timelineEvents';

const INITIAL_TIME = {hour: 9, minutes: 0};
const EVENTS: TimelineEventProps[] = timelineEvents;
export default class TimelineCalendarScreen extends Component {
  state = {
    currentDate: getDate(),
    events: EVENTS,
    eventsByDate: groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)) as {
      [key: string]: TimelineEventProps[];
    },
    modalVisible: false,
  };
  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  handleAddEvent = (newEvent) => {
    const { events, eventsByDate } = this.state;
    const updatedEvents = [...events, newEvent];
    const updatedEventsByDate = groupBy(updatedEvents, e => CalendarUtils.getCalendarDateString(e.start));

    addTimelineEvent(newEvent); // Add the new event to the timelineEvents array

    this.setState({
      events: updatedEvents,
      eventsByDate: updatedEventsByDate,
      modalVisible: false,
    });
  };
  // I need to add logic to add new marked dates whenever a new event is created for that day. 
  marked = {
    [`${getDate(-1)}`]: {marked: true},
    [`${getDate()}`]: {marked: true},
    [`${getDate(1)}`]: {marked: true},
    [`${getDate(2)}`]: {marked: true},
    [`${getDate(4)}`]: {marked: true}
  };
  dotColor = { 
    [`${getDate()}`]: {dotColor: "black"}
  }
  onDateChanged = (date: string, source: string) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    this.setState({currentDate: date});
  };

  onMonthChange = (month: any, updateSource: any) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  createNewEvent: TimelineProps['onBackgroundLongPress'] = (timeString, timeObject) => {
    const {eventsByDate} = this.state;
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, '0')}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;

    const newEvent = {
      id: 'draft',
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: 'New Event',
      color: 'white'
    };

    if (timeObject.date) {
      if (eventsByDate[timeObject.date]) {
        eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date], newEvent];
        this.setState({eventsByDate});
      } else {
        eventsByDate[timeObject.date] = [newEvent];
        this.setState({eventsByDate: {...eventsByDate}});
      }
    }
  };

  approveNewEvent: TimelineProps['onBackgroundLongPressOut'] = (_timeString, timeObject) => {
    const {eventsByDate} = this.state;

    Alert.prompt('New Event', 'Enter event title', [
      {
        text: 'Cancel',
        onPress: () => {
          if (timeObject.date) {
            eventsByDate[timeObject.date] = filter(eventsByDate[timeObject.date], e => e.id !== 'draft');

            this.setState({
              eventsByDate
            });
          }
        }
      },
      {
        text: 'Create',
        onPress: eventTitle => {
          if (timeObject.date) {
            const draftEvent = find(eventsByDate[timeObject.date], {id: 'draft'});
            if (draftEvent) {
              draftEvent.id = undefined;
              draftEvent.title = eventTitle ?? 'New Event';
              draftEvent.color = 'lightgreen';
              eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date]];

              this.setState({
                eventsByDate
              });
            }
          }
        }
      }
    ]);
  };

  private timelineProps: Partial<TimelineProps> = {
    format24h: false,
    onBackgroundLongPress: this.createNewEvent,
    onBackgroundLongPressOut: this.approveNewEvent,
     scrollToFirst: true,
     start: 0,
     end: 24,
    unavailableHours: [{start: 0, end: 6}, {start: 22, end: 24}],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
    
    
  };

  render() {
    const {currentDate, eventsByDate,modalVisible} = this.state;

    return (
        <SafeAreaView style={{flex:1}}>
          
      <CalendarProvider style = {styles.container}
        date={currentDate}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        // numberOfDays={3}
      >
        
        <ExpandableCalendar style = {styles.exCalendar}
        //changes the day of the week shown first
          firstDay={1}
          leftArrowImageSource={require('../images/previous.png')}
          rightArrowImageSource={require('../images/next.png')}
          markedDates={this.marked}
          theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#FFD885',
        selectedDayTextColor: '#000000',
        todayTextColor: '#B8917A',
        dayTextColor: '#2d4150',
        textDisabledColor: '#DBD9D9',
        textMonthFontWeight: '500',
        textMonthFontSize:21,
        //textDayFontSize:
        monthTextColor: 'black',
        dotColor:'#24A866',
        arrowColor:'black',
        dotStyle: {marginTop: -1},
        selectedDotColor: '',
        textDayFontWeight: '400',
        disabledDotColor: '#E9E9E9',
        
        
      }}   
        />
        <View style={styles.newEventContainer}>
        <Button  title="Add New Event" onPress={this.toggleModal}  />
        
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.toggleModal}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <SafeAreaView style={styles.modalView}>
              <View style={styles.formTitle}>
                  <Button title="Cancel" 
                  onPress={this.toggleModal} 
                  color="red" />
                  <Text style={styles.text}>New Event</Text> 
                </View>
                <AddEventForm onSubmit={this.handleAddEvent}/>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </Modal>
          </View>
        <TimelineList 
          events={eventsByDate}
          timelineProps={this.timelineProps}
          showNowIndicator
          //scrollToNow
          //scrollToFirst
          initialTime={INITIAL_TIME}
        />
        
      </CalendarProvider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container : {  
        shadowOpacity: 0,
       // paddingHorizontal: 10,
        backgroundColor: "#f5f5f5",
        shadowOffset:{
          width:100,
          height:300
        },
        
        shadowColor:'blue'
    },
    exCalendar:{
      shadowOpacity:0,
      
    },
    label: {
      fontSize:30,
      marginBottom: 20,
      fontWeight: "bold"
    },
    modalView: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#E8E8E8',
    borderRadius: 50,
    //padding: 35,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .7,
    shadowRadius: 1,
    elevation: 5,
    },
    text: {
      fontSize:20,
      fontWeight:"600",
      marginLeft:25,
      //marginBottom:20,
      textAlign:'center'
    },
    formTitle:{
      flexDirection:'row',
      justifyContent: 'center', 
      alignItems: 'center', 
      paddingLeft:25, 
      gap:40, // this "centers" the tile for now until I can figure out a dynamic way to do so. 
      marginTop:35,
      alignSelf: 'flex-start',

    },
    newEventContainer: {
      padding: 5,
      backgroundColor: "white"
    },
    
  }
)