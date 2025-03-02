import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { PROFILE_IMAGES } from './profile-Images'; 


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


// Component for header content
const HeaderContent = ({ title, subtitle, titleStyle = {} }) => (
  <View style={{ marginTop: 0, alignSelf: 'flex-end' }}>
    <Text style={{ fontSize: 30, fontWeight: 'bold', ...titleStyle }}>{title}</Text>
    {subtitle && <Text style={{ fontSize: 20 }}>{subtitle}</Text>}
  </View>
);

// Memoized profile button component
const ProfileButton = React.memo(({ onPress, imageStyle ={}, imageSource}) => {
  const navigation = useNavigation();
  const handlePress = () => {
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
      style={{ alignSelf: "flex-end" }} 
      onPress={handlePress}
    >
      <Image 
        source={imageSource || defaultImage} 
        style={{ width: 50, height: 50, ...imageStyle  }}
      />
    </TouchableOpacity>
  );
});

// Reusable Predefined Components
const predefinedComponents = {
  // Back button component
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
  
  // Logout button component
  logoutButton: ({ navigation, onPress = () => navigation.goBack() }) => (
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
        <Text style={{ fontSize: 18, fontWeight: '500', marginRight: 15 }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  )
};

// Function to create a custom header. When using in practice use with ":" ie. title:, or titleStyle:{ padding: }
const createCustomHeader = (options = {}) => {
  const {
    title = "Petter",
    subtitle = "Hello Samantha",
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
    titleStyle = {}, // for changes to the title text style
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
      return <HeaderContent title={title} subtitle={subtitle} titleStyle={titleStyle} />;
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