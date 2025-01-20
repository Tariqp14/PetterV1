
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Screens imported below
import HomeScreen from './pages/Home';
import Feed from './pages/Feed';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './pages/Profile';
import Exercises from './pages/Exercise';
import Products from './pages/Products';
//component for the nav bar

const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Profiles" component={Profile} />
                <Tab.Screen name="Feed" component={Feed} />
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Exercises" component={Exercises} />
                <Tab.Screen name="Products" component={Products} />
            </Tab.Navigator>     
        </NavigationContainer>
    );
}
export default BottomTab;

// video for navbar creation https://www.youtube.com/watch?v=AnjyzruZ36E
//https://reactnavigation.org/docs/bottom-tab-navigator
//https://youtu.be/gPaBicMaib4