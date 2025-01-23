import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation, NavigationContainer, NavigationIndependentTree, useNavigation } from '@react-navigation/native';
import ProfileCreator from './Profile-Creator';

const Stack = createNativeStackNavigator();

//profile function hold the info/components for the page
export default function Profile() {
    //setting up navigation to profile creation page -T
    //guide i used for creating the navigation https://reactnative.dev/docs/navigation -T
    //gave code to chatgpt because I forgot to add "const navigation = useNavigation();" it gave me this as a solution to make the page functional -T

  return (
    //top view houses everything -T
    //goal is to remove this and add it to navigation eventually
        <>
        <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Info" component={Info}
            >
            </Stack.Screen>
            <Stack.Screen component={ProfileCreator} name="Profile-Creator"/>
          </Stack.Navigator>
        </NavigationContainer>
        </NavigationIndependentTree>
        </>
  );
}

function Info () {
  const navigation = useNavigation();
  return(
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.title}>Your Pets</Text>
        
      </View>
      <View style={styles.petdisplay}>
        <View style={styles.petcard}>
          <View>
            <Image></Image>
          </View>
        </View>

      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.addbutton} 
        onPress={() => navigation.navigate('Profile-Creator')}>
          <Image 
          source ={require('../images/plus.png')}
          />
        </TouchableOpacity> 
        <Text
          style={{ fontSize:12, justifyContent:"center", marginTop: 10,}}>Add New Profile
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}


//asked chatgpt why plus button wasnt centered and it added a justify content and aligntItems to fix the issue -T
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  regular: {
    fontSize: 12,
  },
  title: {
    fontSize: 26,
    textAlign:"center",
    flex: 1,
  },
  topbar: {
  flexDirection: "row",
  alignItems: "center",
  },
  petdisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttoncontainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addbutton: {
    height: 40,
    width: 40,
    borderRadius: 6,
    backgroundColor: "#ffd885",
    justifyContent: "center",
    alignItems: "center",
  },
  petcard: {
    height: 187,
    width: 149,
    backgroundColor: "#ffd885",
    borderRadius: 6,
    margin:15,
  }
});

/*
Current Tasks -T
Style NavBar somewhat
remove headers
start profile page styling
    background
    title
    buttons
    text

Future Concerns
pet profile card system
storing information


Resources for future implementation
https://reactnavigation.org/docs/getting-started/

*/