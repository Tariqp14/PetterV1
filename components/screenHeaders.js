import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import createCustomHeader from './headerCreator'


  // Home screen header
  export const HomeHeader = createCustomHeader({
    // these are not needed since they are the default but I kept them to see an example
    title: "Petter",
    subtitle: "Hello Samantha",
    height: 130,
    backgroundColor: 'white',
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
  
 