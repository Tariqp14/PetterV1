import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import createCustomHeader from './headerCreator'


// Home screen header
export const WelcomeHeader = createCustomHeader({

  title: "Petter",
  showProfile: false,
  subtitle: null,
  height: 130,
  backgroundColor: 'white',
  titleStyle:{
    marginLeft:30,
  },
});

export const LoginHeader = createCustomHeader({

  title: "Petter",
  showProfile: false,
  subtitle: null,
  height: 130,
  backgroundColor: 'white',
  titleStyle:{
    marginLeft:30,
  },
  
});


  // Home screen header
  export const HomeHeader = createCustomHeader({
    title: "Petter",
    height: 130,
    backgroundColor: 'white',
    profileContainerStyle:{
      borderWidth:1,
      borderRadius:100,
      borderColor:"lightgrey"
    }
    
  });
  
  // Calendar screen header
  export const CalendarHeader = createCustomHeader({
    showProfile: false, // removes the profile button
    leftComponentType:"back",
    height: 110,
    backgroundColor: 'white',
  })
  
  // Profile screen header
  export const UserProfileHeader = createCustomHeader({
    leftComponentType: 'back',
    rightComponentType: 'logout',
    height: 120,
    backgroundColor: 'white',
    // You can customize the predefined components if needed
    leftComponentProps: {
      showText: false, // Only show the back icon without text   
        }
  });

   // Edit Profile screen header
   export const EditProfileHeader = createCustomHeader({
    leftComponentType: 'back',
    showProfile: false,
    height: 120,
    backgroundColor: 'white',
    // You can customize the predefined components if needed
    leftComponentProps: {
      showText: false, // Only show the back icon without text   
        },
        centerComponent: () => (
          <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf:"flex-end"  }}>
            <Text style={{ fontSize: 22, fontWeight: '500'}}>Edit Profile</Text>
          </View>
        ),
        rightComponent: () => <View style={{width: 24}} />
  });
  export const PetProfileHeader = createCustomHeader({
    title: "Pet Profile",
    subtitle: null,
    showProfile: false,
    titleStyle:{
      fontWeight:500,
      //marginLeft:10,
      fontSize:26,
    }
});
export const ExerciseHeader = createCustomHeader({
  title: "Exercise",
  subtitle: null,
  showProfile: false,
  titleStyle:{
    fontWeight:500,
    //marginLeft:10,
    fontSize:26,
  },
  
});
export const ProductsHeader = createCustomHeader({
  title: "Products and Services",
  subtitle: null,
  showProfile: true,
  titleStyle:{
    fontWeight:500,
    //marginLeft:10,
    fontSize:26,
  },
  profileContainerStyle: {
    alignSelf:"flex-end",
    //marginBottom:-5, can add this if the group thinks it looks better
    borderWidth:1,
    borderRadius:100,
    borderColor:"lightgrey"
  }
});
export const FeedHeader = createCustomHeader({
  title: "Feeding Schedule",
  subtitle: null,
  showProfile: true,
  titleStyle:{
    fontWeight:500,
    //marginLeft:10,
    fontSize:26,
  },
  //since I added the profile container style I might remove the Avatar-Outline since I can outline it with this new style. 
  profileContainerStyle: {
    alignSelf:"flex-end",
    //marginBottom:-5, can add this if the group thinks it looks better
    borderWidth:1,
    borderRadius:100,
    borderColor:"lightgrey"
  }
});

  
 