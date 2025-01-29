
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
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

const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name='HomeScreen' component={HomeScreen} options={{
                headerShown: false, // this removes the extra header from the home
            }} />
            <HomeStack.Screen name='timelineCalendarScreen' component={TimelineCalendarScreen} options={{
               headerShown: false, // this removes the extra header from the home still trying to figure out a way to swap the headers
            }} />

        </HomeStack.Navigator>
    )
}

// function to have two lines in the header. Adds styling as well
const HeaderTitle = () => (
    <View>
        <Text style={{ fontSize: 30, fontWeight:'bold'}}>Petter</Text>
        <Text style={{ fontSize: 20 }}>Hello Samantha</Text>
    </View>
);
//component for the nav bar
const Tab = createBottomTabNavigator();
//Houses the main five pages and associated content withing the navbar
function BottomTab() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            // this creates a function to select a named icon from the "Ionicons" library to fill in the icon for the tab. It also allows for the changing of its size and color. We may or may not use this but it can be a placeholder for the final version. 
            screenOptions={({route, navigation}) => ({
            tabBarIcon:({color,focused,size}) =>{
                let iconName;

                if (route.name === "Feed"){
                    iconName = 'bowl'
                }
                else if (route.name === "Home"){
                    iconName = "home"
                }
                else if (route.name === "Exercises"){
                    iconName = "dog-side"
                }
                else if (route.name === "Products"){
                    iconName = "bone"
                }
                else if (route.name === "Profiles"){
                    iconName = "paw"
                }
                return <MaterialCommunityIcons name={iconName} size={size} color={color}/>
                }
            })}
            >
                <Tab.Screen name="Profiles" component={Profile} />   
                <Tab.Screen name="Feed" component={Feed} />
                <Tab.Screen name="Home" component={HomeStackGroup}
                    options={{
                        headerTitle: () => <HeaderTitle/>,
                        headerStyle:{
                            height:130,  // creates more space vertically in the header
                            shadowColor: 'transparent', // Removes the bottom header border on Iphone
                            borderBottomWidth: 0, // Removes the border on Android supposedly? Not sure because I am using a iphone
                        },
                        headerTitleAlign: 'left',
                        headerTitleStyle: {
                            fontSize:30
                        },
                        headerRight: () => (
                            <Ionicons name={'person-circle'} size={50} color={'grey'}/>
                        ),
                       
                        
                    }}/>
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