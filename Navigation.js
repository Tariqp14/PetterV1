import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screen } from '@react-navigation/elements';
import Calendar from "./pages/Calendar";
import Dates from "./pages/Calendar";
import TimelineCalendarScreen from "./pages/timelineCalendarScreen";
import Form from "./pages/formPage";
import AddEventForm from "./pages/eventForm";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import MyExpandableCalendar from "./pages/calendarDatesHome";
//import Exercise from "./pages/Exercise";
//import Home from "./pages/Home";


//bottom tab
/* const Tab = createBottomTabNavigator

function TabGroup() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Calendar" component={Calendar} />
        </Tab.Navigator>
    );
} */
// top Tabs 
// in progress still. May have to cut because of a bug. 
/* const TopTabs = createMaterialTopTabNavigator();

function TopTabsGroup(){
    return (
        <TopTabs.Navigator
        screenOptions={{
            //makes the tabs smaller
            tabBarItemStyle:{
                width: 70
            },
            //text size
            tabBarLabelStyle:{
                fontSize:14
            },
            // trying to get rid of bottom border
            tabBarStyle:{
                shadowOffset: {
                    width:0, 
                    height: 0
                },
            },
            //container for text style
            tabBarContentContainerStyle:{
                marginLeft:12
            },
           //underline style
            tabBarIndicatorStyle:{
                //backgroundColor:'green',
                marginLeft: 12
            }

        }}
        >
        <TopTabs.Screen name="Day" component={Home}/>
        <TopTabs.Screen name="Month" component={Exercise}/>
        <TopTabs.Screen name="Year" component={TimelineCalendarScreen}/>
        </TopTabs.Navigator>
    )
} */
// bottom Tabs
const Tab = createBottomTabNavigator();

function TabGroup(){
    return(
        <Tab.Navigator
        // this creates a function to select a named icon from the "Ionicons" library to fill in the icon for the tab. It also allows for the changing of its size and color. We probably wont use this but it can be a placeholder for the final version. 
        screenOptions={({route, navigation}) => ({
            tabBarIcon:({color,focused,size}) =>{
                let iconName;
                if (route.name === "Calendar"){
                    iconName = "calendar"
                }
                else if (route.name === "EventForm"){
                    iconName = "book"
                }
                // enter a number for size and string for color
                return <Ionicons name={iconName} size={size} color={color}/>
            }
        })}
        >
            <Tab.Screen name="Calendar" component={TimelineCalendarScreen} options={{
                headerStyle:{
                    height:130
                },
                // This removes the tile 
                //headerTitleStyle: {display: 'none'},

                headerRight: () => (
                    <Ionicons name={'person-circle'} size={50} color={'grey'}/>
                )
                
            }}/>
            <Tab.Screen name="EventForm" component={MyExpandableCalendar}/>
        </Tab.Navigator>
    )
}
//Function to create nav screen
export default function Navigation() {
    return (
        <NavigationContainer>
            <TabGroup/>
        </NavigationContainer>
    )
}