import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screen } from '@react-navigation/elements';
import Calendar from "./pages/Calendar";
import Dates from "./pages/Calendar";
import TimelineCalendarScreen from "./pages/timelineCalendarScreen";
import Form from "./pages/formPage";
import AddEventForm from "./pages/eventForm";

//bottom tab
/* const Tab = createBottomTabNavigator

function TabGroup() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Calendar" component={Calendar} />
        </Tab.Navigator>
    );
} */

//Function to create bottom nav bar
export default function Navigation() {
    return (
        <NavigationContainer>
            <TimelineCalendarScreen/>
        </NavigationContainer>
    )
}