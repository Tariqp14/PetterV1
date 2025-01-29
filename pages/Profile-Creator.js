import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import PetForm from '../components/Pet-Form';

/*Pet-Form.js contains code for functionality*/
//function for the pet creation form
export default function ProfileCreator() {
    return (
        <View>
            <PetForm/> 
        </View>
    );
}
