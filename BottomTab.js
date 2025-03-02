
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation, } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
//Screens imported below
import HomeScreen from './pages/Home';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Exercises from './pages/Exercise';
import Products from './pages/Products';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimelineCalendarScreen from './pages/timelineCalendarScreen';
import ExerciseTracker from './pages/ExerciseTracker';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';
import SignUpScreen1 from './pages/SignUpScreen1';
import UserProfile from './pages/UserProfile'
import ProfileForm from './pages/profileForm';

import { HomeHeader,CalendarHeader,UserProfileHeader,EditProfileHeader} from './components/screenHeaders';

import { auth } from './config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import  useAuth  from './config/useAuth';
import { Image } from 'react-native';

const HomeStack = createNativeStackNavigator();
const ExerciseStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();



function LoginStackGroup() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{
                headerShown: false, // this removes the extra header from the home
            }} />
            <LoginStack.Screen name='LoginScreen' component={LoginScreen} options={{
                headerBackVisible: false,
                headerTitle: () => <HeaderTitleLogin />,
                headerTransparent: true, // used ai to figure out how to remove bottom shadow
            }} />
            <LoginStack.Screen name='SignUpScreen' component={SignUpScreen} options={{
                headerBackVisible: false,
                headerTitle: () => <HeaderTitleLogin />,
                headerTransparent: true, // used ai to figure out how to remove bottom shadow
            }} />
            <LoginStack.Screen name='SignUpScreen1' component={SignUpScreen1} options={{
              headerBackVisible: false,
              headerTitle: () => <HeaderTitleLogin/>,
              headerTransparent: true, // used ai to figure out how to remove bottom shadow
            }} />

        </LoginStack.Navigator>
    )
}

function HomeStackGroup() {
 
    return (
        <HomeStack.Navigator
        >
            <HomeStack.Screen name='HomeScreen' component={HomeScreen} options={{
                header: (props) => <HomeHeader {...props}/>
            }} />
            <HomeStack.Screen name='timelineCalendarScreen' component={TimelineCalendarScreen} options={{
               header: (props) => <CalendarHeader {...props}/>
                
            }} />
            <HomeStack.Screen name='UserProfileScreen' component={UserProfile} 
            options={{
                header: (props) => <UserProfileHeader {...props}/>
            }} />
            <HomeStack.Screen name='ProfileForm' component={ProfileForm} options={{
                header: (props) => <EditProfileHeader {...props}/>,
            }}/>
        </HomeStack.Navigator>
    )
}

function ExerciseStackGroup() {
    return (
        <ExerciseStack.Navigator>
            <ExerciseStack.Screen name='Exercises' component={Exercises} options={{
                header: (props) => <HomeHeader {...props}/>
            }} />
            <ExerciseStack.Screen name='ExerciseTracker' component={ExerciseTracker} options={{
                header: (props) => <HomeHeader {...props}/>
            }} />

        </ExerciseStack.Navigator>
    )
}

//component for the nav bar
const Tab = createBottomTabNavigator();
//Houses the main five pages and associated content withing the navbar
function BottomTab() {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            // this creates a function to select a named icon from the "Ionicons" library to fill in the icon for the tab. It also allows for the changing of its size and color. We may or may not use this but it can be a placeholder for the final version. 
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ color, focused, size }) => {
                    let iconName;

                    if (route.name === "Feed") {
                        iconName = 'bowl'
                    }
                    else if (route.name === "Home") {
                        iconName = "home"
                    }
                    else if (route.name === "Exercises") {
                        iconName = "dog-side"
                    }
                    else if (route.name === "Products") {
                        iconName = "bone"
                    }
                    else if (route.name === "Profiles") {
                        iconName = "paw"
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                }
            })}
        >
            {/* Header */}
            <Tab.Screen name="Profiles" component={Profile} />
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Home" component={HomeStackGroup}
                options={{
                    headerShown: false,
                }} />
            <Tab.Screen name="Exercises" component={ExerciseStackGroup} options={{
                    headerShown: false,
                }} />
            <Tab.Screen name="Products" component={Products} />
        </Tab.Navigator>
    );
}

//This is a new function that allows navigation from the login stack to the main home screen stack. I did not change anything in the bottom tabs stack. I just added it to this new overall navigation 
const Stack = createNativeStackNavigator()
function Navigation() {
    const {user} = useAuth()


    return (
        <NavigationContainer>
            {true ? (
                // When the user is authenticated, directly navigate to BottomTabs
                <BottomTab />
            ) : (
                // If not authenticated, show the login stack
                <Stack.Navigator>
                    <Stack.Screen name='Login' component={LoginStackGroup} options={{ headerShown: false }} />
                    {/* You don't need to show BottomTabs here as the user will navigate to it once logged in */}
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}

export default Navigation;

// video for navbar creation https://www.youtube.com/watch?v=AnjyzruZ36E
//https://reactnavigation.org/docs/bottom-tab-navigator
//https://youtu.be/gPaBicMaib4

/*
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginStackGroup} options={{
                    headerShown: false
                }} />
                <Stack.Screen name='BottomTabs' component={BottomTab} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        </NavigationContainer>


*/
