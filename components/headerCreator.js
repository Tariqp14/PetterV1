import React, { useMemo,useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { PROFILE_IMAGES } from './profile-Images'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth,db} from '../config/firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, limit } from 'firebase/firestore';


// Used ai to create a function that allows me to update the custom header easily on different screens. 

//based off this code I made for the custom header

//---------------------------------------------

// function to have two lines in the header. Adds styling as well
/* const HeaderTitle = () => (
    <View style={{marginTop:0, alignSelf:'flex-end'}}> 
        <Text style={{ fontSize: 30, fontWeight: 'bold',  }}>Petter</Text>
        <Text style={{ fontSize: 20 }}>Hello Samantha</Text>
    </View>
);

const ProfileButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{alignSelf:"flex-end", }}onPress={() => navigation.navigate('UserProfileScreen')}>

            <Image source={require('./images/Frame37.png')}
            style={{ width: 50, height: 50 }}
            />

        </TouchableOpacity>
    );
};

const CustomHeader = () => {
    const navigation = useNavigation();
    return (
        <View style={{ 
            height: 130, 
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingBottom:15,
            //marginVertical:50,
            backgroundColor: 'white'
        }}>
            <HeaderTitle />
            <ProfileButton />
        </View>
    );
}; */

//---------------------------------------------

// The custom Components are based of of this code below

//---------------------------------------------
/*  leftComponent: ({ navigation }) => (
          <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'flex-end',}}>
            <TouchableOpacity 
              style={{
                flexDirection:'row',
                minWidth: 40, 
                height: 30, 
                borderRadius: 20,
                //backgroundColor: '#f0f0f0',
                justifyContent: 'center',
                alignItems: 'center',
              }} 
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={30} color="black" />
             
            </TouchableOpacity>
            
          </View>
        ),
       
        rightComponent: ({ navigation }) => (
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'flex-end',}}>
              <TouchableOpacity 
                style={{
                  flexDirection:'row',
                  minWidth: 40, 
                  height: 30, 
                  borderRadius: 20,
                  //backgroundColor: '#f0f0f0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }} 
                onPress={() => navigation.goBack()}
              >
                <Text style={{ fontSize: 18, fontWeight: '400',marginRight:15,}}>
                Log Out
              </Text>
              </TouchableOpacity>
              
            </View>
          ), */
//---------------------------------------------

// used AI for the @comments. These lines don't affect how the code runs - they're purely for documentation and developer tooling. The main reason I added them was for the Parameter hints when calling the createCustomHeader function.
/* 
---AI purpose summary---
Purpose of JSDoc Comments (@comments)
These comments serve several important purposes:

Documentation: They make your code self-documenting for other developers

IDE Support: Modern editors like VS Code use these comments to provide:
- Intelligent code completion
- Parameter hints when calling the function
- Type checking (even in plain JavaScript)

Documentation Generation: Tools can extract these comments to generate documentation websites/page
*/


//  --------- Header Component --------
/**
 * Renders the title and optional subtitle for a header component
 */
const HeaderContent = ({ title, subtitle, titleStyle = {}, subtitleStyle = {} }) => {
  const [firstName, setFirstName] = useState(null); //
  const navigation = useNavigation();
  
  // this is a function to get firstName attribute from asyncStorage and Firebase
  useEffect(() => {
    // Only fetch the name if we're using the default subtitle format
    if (subtitle === "Hello there" ) {
      const fetchName = async () => {
        try {
          //Default to trying asyncStorage 
          const storedName = await AsyncStorage.getItem('userFirstName');
          if (storedName) {
            setFirstName(storedName);

            //this allows for the updating of the name if something changes. ie. User updates his profile name
            refreshFromFirebase();
            // if there is no name in storage try to pull from firebase
          } else if (auth.currentUser){
            //if for some reason there is an issue with access to the database, this will wait until there is proper access and display a name if there is one. 
            await refreshFromFirebase()
          }
          // if neither works it will log an error
        } catch (error) {
          console.log('Error loading firstName:', error);
        }
      };
      
      // Had help from Ai for this function. Left Comments to help explain the code. 
      const refreshFromFirebase = async () => {
        if (!auth.currentUser) return;

        try {
          // Create a query that targets the 'user info' sub-collection of the current user
          // limits the result to just 1 document (for efficiency)
          const userInfoQuery = query(
            collection(db, "users", auth.currentUser.uid, "user info"),
            limit(1)
          );
          
          // Execute the query and get the results
          const querySnapshot = await getDocs(userInfoQuery);
          
          // Check if any documents were returned
          if (!querySnapshot.empty) {
            // Extract data from the first document
            const userData = querySnapshot.docs[0].data();
            
            // If the document contains a firstName field
            if (userData.firstName) {
              // Update the component's state with the name
              setFirstName(userData.firstName);
              
              // Also save to AsyncStorage for faster access next time
              await AsyncStorage.setItem('userFirstName', userData.firstName);
            }
          }
        } catch (error) {
          console.log('Error refreshing from Firebase:', error);
        }
      };

      const headerFocus = navigation.addListener('focus', () => {
        console.log('Screen focused, refreshing name data');
        fetchName();
      });

      //focus listener to refresh name when screen comes into focus
      fetchName();

      return () => headerFocus();
    }
  }, [subtitle, navigation]);

  // this is the initial styling. Includes conditional logic at the end that will pull 1 a custom subtitle, 2 the firstName property if there is one, or 3 a default text if nothing else is available
  return (
    <View style={{ marginTop: 0, alignSelf: 'flex-end' }}>
    <Text style={{ fontSize: 30, fontWeight: 'bold', ...titleStyle }}>{title}</Text>
    {(subtitle || firstName) && (
      <Text style={{ fontSize: 20, ...subtitleStyle }}>
        {subtitle && subtitle !== "Hello there" 
          ? subtitle 
          : firstName 
            ? `Hello ${firstName}` 
            : "Hello Pet Lover"}
      </Text>
    )}
  </View>
);
}
/**
 * --------- Profile Image Button  --------
 * A memoized profile image button that navigates to profile screen
 * Ai Recommendation for efficiency
 * supposed to prevent things from being rerendered if they are frequently used
 */
const ProfileButton = React.memo(({ onPress, imageStyle ={}, imageSource,containerStyle = {}}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    //if there is a custom navigation it will run that and pass navigation into it so it can work, If not it will got straight to the profile screen
    if (onPress) {
      return onPress(navigation);
    } else {
      return navigation.navigate('UserProfileScreen');
    }
  };
  // Takes the default profile I have set in the profile-images folder
  const defaultImage = PROFILE_IMAGES.DEFAULT;
  
  return (
    <TouchableOpacity 
      style={{ alignSelf: "flex-end", ...containerStyle }} 
      onPress={handlePress}
    >
      <Image 
        source={imageSource || defaultImage} 
        style={{ width: 50, height: 50, ...imageStyle  }}
      />
    </TouchableOpacity>
  );
});

/**
 * Collection of reusable predefined header components
 */
const predefinedComponents = {
  /**
   *  --------- Back Button  --------
   *  Renders a back button with optional text  
   */
  backButton: ({ navigation, showText = true, onPress = () => navigation.goBack() }) => (
    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'flex-end'}}>
      <TouchableOpacity 
        style={{
          flexDirection: 'row',
          minWidth: 40, 
          height: 30, 
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }} 
        onPress={onPress}
      >
        <Entypo name="chevron-thin-left" size={24} color="black" />
        {showText && (
          <Text style={{marginLeft: 5, fontSize: 18, fontWeight: 'bold'}}>
            Back
          </Text>
        )}
      </TouchableOpacity>
    </View>
  ),
  
  /**
   * --------- Logout Button  --------
   * Renders a logout button that takes users back to welcome page.
   */
  logoutButton: ({ navigation, onPress }) => {
    const handleLogout = () => {

    // Logout conformation. 
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Logout", 
            onPress: async () => {
              try {
                // Clear user auth data. and reset profileSetupComplete so that when signing up after logout they still get navigated to signupscreen1 
                await AsyncStorage.multiSet([
                  ['userFirstName', ''],
                  ['profileSetupComplete', 'false'] // Store as string
                ]);

                // handles logging the user out. This is a firebase Function 
                await signOut(auth)
                
                // If custom onPress is provided (e.g., for any added things you want to do when you logout)
                if (onPress) {
                  await onPress();
                }

              } catch (error) {
                console.error('Error during logout:', error);
                Alert.alert("Error", "Failed to log out properly");
              }
            }
          }
        ]
      );
    };
      // logout button styling 
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'flex-end'}}>
        <TouchableOpacity 
          style={{
            flexDirection: 'row',
            minWidth: 40, 
            height: 30, 
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }} 
          onPress={handleLogout}
        >
          <Text style={{ fontSize: 18, fontWeight: '500', marginRight: 15 }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
    
  }

/**
 * Creates a customizable header component with configurable elements
 * @param {Object} options - Configuration options for the header
 * @param {string} [options.title="Petter"] - Title text to display
 * @param {string} [options.subtitle="Hello Samantha"] - Subtitle text to display
 * @param {boolean} [options.showProfile=true] - Whether to show profile button
 * @param {number} [options.height=130] - Height of the header in pixels
 * @param {string} [options.backgroundColor="white"] - Background color of the header
 * @param {JSX.Element|Function} [options.rightComponent] - Custom component for right side
 * @param {string} [options.rightComponentType] - Predefined right component type ('logout')
 * @param {Object} [options.rightComponentProps={}] - Props for predefined right component
 * @param {JSX.Element|Function} [options.leftComponent] - Custom component for left side
 * @param {string} [options.leftComponentType] - Predefined left component type ('back')
 * @param {Object} [options.leftComponentProps={}] - Props for predefined left component
 * @param {JSX.Element|Function} [options.centerComponent] - Custom component for center
 * @param {Function} [options.onProfilePress] - Handler for profile button press
 * @param {Object} [options.profileImageSource=null] - Custom profile image source
 * @param {Object} [options.profileImageStyle={}] - Style overrides for profile image
 * @param {Object} [options.profileContainerStyle={}] - Style overrides for profile image container
 * @param {Object} [options.titleStyle={}] - Style overrides for title text
 * @param {Object} [options.subtitleStyle={}] - Style overrides for subtitle text
 * @param {Object} [options.additionalStyles={}] - Additional styles for header container
 * @returns {Function} A memoized React component that renders the custom header
 */
const createCustomHeader = (options = {}) => {
  const {
    title = "Petter",
    subtitle = "Hello there", // This will actually never display anymore because of the subtitle logic in header content. Might come back to see if this can be used for simpler logic. 
    showProfile = true,
    height = 130,
    backgroundColor = 'white',

    rightComponent, //treat these three like your coding from scratch ie. with <View> and <Text>. Can be used to help make new component types or for one time use in line components
    rightComponentType, // can be 'logout' for logout button
    rightComponentProps = {}, // custom props for predefined components.

    leftComponent, //treat these three like your coding from scratch ie. with <View> and <Text>. Can be used to make new component types or for one time use components
    leftComponentType, // can be 'back' for back button
    leftComponentProps = {}, // custom props for predefined components. Can change 'showText:' true or false for back button

    centerComponent, // none of our current screens used anything in the center so there are no predefined components 
    onProfilePress = (navigation) => navigation.navigate('UserProfileScreen'), // use this with ":" and change ('YourNewScreenName')
    profileImageSource = null, // replace null with require('.new/image/path')
    profileImageStyle = {}, // for changes of image its self. ie. Height and width 
    profileContainerStyle = {}, // for changes to profile image container. ie. can change margins for image to move it in space
    titleStyle = {}, // for changes to the title text style
    subtitleStyle = {}, // for changes to the subtitle text style
    additionalStyles = {},// for changes to the header container
  } = options;

  // Return memoized header component. 
  // Got this from ai. Supposedly makes it so the coded does not rerender common elements that don't change very often. 
  return React.memo(({ navigation }) => {
    // Memoize header styles
    const headerStyles = useMemo(() => ({
      height,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // This makes it so when there are two items they are both on the edge and when there are three they are spaced evenly. If you try to just put something in the center it will look strange. You may just want to put empty placeholders on the edges. 
      paddingHorizontal: 20,
      paddingBottom: 15,
      backgroundColor,
      ...additionalStyles
    }), [height, backgroundColor, additionalStyles]);
    
    // Determine left component
    // logic basically renders left component with priority: 
    // 1) custom component if provided 2) predefined back component if specified or 3) default header content.
    const renderLeftComponent = () => {
      if (leftComponent) {
        return typeof leftComponent === 'function' ? leftComponent({ navigation }) : leftComponent;
      } 
      if (leftComponentType === 'back') {
        return predefinedComponents.backButton({ navigation, ...leftComponentProps });
      }
      return <HeaderContent 
        title={title} 
        subtitle={subtitle} 
        titleStyle={titleStyle}
        subtitleStyle={subtitleStyle} 
      />;
    };
    
    // Determine right component
    // logic basically renders right component with priority: 
    //1) custom component if provided 2) predefined logout button if specified 3) profile button if enabled, or 4) nothing
    const renderRightComponent = () => {
      if (rightComponent) {
        return typeof rightComponent === 'function' ? rightComponent({ navigation }) : rightComponent;
      } 
      if (rightComponentType === 'logout') {
        return predefinedComponents.logoutButton({ navigation, ...rightComponentProps });
      }
      if (showProfile) {
        return (
          <ProfileButton 
            onPress={() => onProfilePress(navigation)}
            imageStyle={profileImageStyle}
            imageSource={profileImageSource}
            containerStyle={profileContainerStyle}
          />
        );
      }
      return null;
    };
    
    return (
      <View style={headerStyles}>
        {renderLeftComponent()}
        
        {centerComponent && 
          (typeof centerComponent === 'function' ? centerComponent({ navigation }) : centerComponent)}
      
        {renderRightComponent()}
      </View>
    );
  });
};

export default createCustomHeader;