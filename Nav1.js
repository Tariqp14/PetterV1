import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import Exercise from "./pages/Exercise";
import Home from "./pages/Home";
import Feed from "./pages/Feed";

const TopTabs = createMaterialTopTabNavigator();

function TopTabsGroup(){
    console.log("TopTabsGroup Rendered")
    return (
        <TopTabs.Navigator
        screenOptions={{
            tabBarItemStyle:{ width: 70 },
            tabBarLabelStyle:{ fontSize:14 },
            tabBarStyle:{
                backgroundColor: '#fff',
                shadowOffset: { width:0, height: 0 }
            }
        }}
        >
            <TopTabs.Screen 
                name="Home" 
                component={Home}
                options={{
                    tabBarLabel: 'Home'
                }}
                listeners={{
                    tabPress: e => {
                        console.log("Home Tab Pressed");
                    }
                }}
            />
            <TopTabs.Screen 
                name="Exercise" 
                component={Exercise}
                options={{
                    tabBarLabel: 'Month'
                }}
                listeners={{
                    tabPress: e => {
                        console.log("Exercise Tab Pressed");
                    }
                }}
            />
            <TopTabs.Screen 
                name="Feed" 
                component={Feed}
                options={{
                    tabBarLabel: 'Year'
                }}
                listeners={{
                    tabPress: e => {
                        console.log("Feed Tab Pressed");
                    }
                }}
            />
        </TopTabs.Navigator>
    )
}

// bottom Tabs
const Tab = createBottomTabNavigator();

function TabGroup(){
    return(
        <Tab.Navigator
        screenOptions={({route, navigation}) => ({
            tabBarIcon:({color,focused,size}) =>{
                let iconName;
                if (route.name === "Calendar"){
                    iconName = "calendar"
                }
                else if (route.name === "EventForm"){
                    iconName = "book"
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            }
        })}
        >
            <Tab.Screen name="Calendar" component={TopTabsGroup} />
        </Tab.Navigator>
    )
}

export default function Nav1() {
    return (
        <NavigationContainer>
            <TabGroup/>
        </NavigationContainer>
    )
}