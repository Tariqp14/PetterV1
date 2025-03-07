import { View, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState,useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { PROFILE_IMAGES } from '../components/profile-Images';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function UserProfile() {
    const navigation = useNavigation();
    const [selectedPet, setSelectedPet] = useState('Coco'); // Add state to track selected pet. Default is coco. 
    const [firstName, setFirstName] = useState('');
    //this is to get firstName from asyncStorage
    useEffect(() => {
        const fetchName = async () => {
            try {
                const storedName = await AsyncStorage.getItem('userFirstName');
                if (storedName) {
                    setFirstName(storedName);
                }
            } catch (error) {
                console.log('Error loading firstName:', error);
            }
        };
        
        fetchName();
    }, []);
    /* text will display either firstName from async or Pet Lover  */
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={PROFILE_IMAGES.OUTLINE} style={{ width: 100, height: 100 }}/>
            </View>
            
            <View style={styles.nameContainer}>
                <View style={styles.nameTextWrapper}>
                    <Text style={styles.nameText}>{firstName || 'Pet Lover'}</Text> 
                </View>
                <TouchableOpacity style={styles.editIconContainer}>
                <Ionicons name="pencil" size={24} color="black" onPress={() => navigation.navigate('ProfileForm')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.subTitleContainer}>
                <Text style={styles.subTitle}>My Pets</Text>
            </View>
            <View style={styles.petNameContainer}>
                <TouchableOpacity 
                // sets the selected pet to coco
                    onPress={() => setSelectedPet('Coco')}
                    style={styles.tabButton}
                >
                    <Text style={[
                        //if coco is selected it applies a new style to the text and underline
                        styles.petNamesText, 
                        selectedPet === 'Coco' && styles.selectedPetText
                    ]}>Coco</Text>
                    {selectedPet === 'Coco' && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setSelectedPet('Mr Whiskers')}
                    style={styles.tabButton}
                >
                    <Text style={[
                        styles.petNamesText, 
                        selectedPet === 'Mr Whiskers' && styles.selectedPetText
                    ]}>Mr Whiskers</Text>
                    {selectedPet === 'Mr Whiskers' && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.optionsTextContainer}>
                    <Text style={styles.optionsText}>Reminders</Text>
                    <Entypo name="chevron-thin-down" size={24} color="black" />
                </View>
                <View style={styles.optionsUnderline}/>
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.optionsTextContainer}>
                    <Text style={styles.optionsText}>Saved Address</Text>
                    <Entypo name="chevron-thin-down" size={24} color="black" />
                </View>
                <View style={styles.optionsUnderline}/>
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.optionsTextContainer}>
                    <Text style={styles.optionsText}>Order History</Text>
                    <Entypo name="chevron-thin-down" size={24} color="black" />
                </View>
                <View style={styles.optionsUnderline}/>
            </View>
            <View style={styles.deleteButtonContainer}>
                <TouchableOpacity style={styles.deleteButton} >
                    <Text style={styles.deleteButtonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        alignItems:"center"
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    nameContainer: {
        marginBottom: 40,
        flexDirection: "row",
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: "center"
    },
    nameTextWrapper: {
        alignItems: 'center',
    },
    editIconContainer: {
        position: 'absolute',
        right: 0,
        marginRight:"20%"
    },
    petNameContainer: {
        flexDirection:"row",
        gap:20,
        marginBottom:40,
    },
    tabButton: {
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    tabIndicator: {
        height: 3,
        backgroundColor: '#24A866', 
        width: '100%',
        marginTop: 3,
    },
    subTitleContainer: {
        marginBottom: 20,
    },
    nameText: {
        fontSize: 28,
        
    },
    petNamesText: {
        fontSize: 20,
    },
    selectedPetText: {
        fontWeight: '600', // Or use '700' for specific weight
    },
    subTitle: {
        fontSize: 16,
        fontWeight:"500"
    },
    optionsText: {
        fontSize: 18,
    },
    optionsContainer:{
        paddingHorizontal:20,
        marginBottom:20,
        width: '100%', 
        height: 45,
        //backgroundColor:'blue',
        justifyContent:"space-between"
    },
    optionsTextContainer:{
        flexDirection:'row',
        justifyContent:"space-between"
    },
    optionsUnderline:{
        height: 1,
        backgroundColor: 'black', 
        width: '100%',
        
    },
    deleteButtonContainer: {
        marginTop: 30,
        alignItems: 'center',
        width: '100%',
    },
    deleteButton: {
        backgroundColor: '#CA0000',
        paddingVertical: 10,
        paddingHorizontal: 23,
        borderRadius: 6,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    

});
