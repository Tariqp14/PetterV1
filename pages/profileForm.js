import { View, TextInput, Text, Button, StyleSheet, ScrollView, KeyboardAvoidingView,Image,TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import { PROFILE_IMAGES } from '../components/profile-Images'; 
import { auth, db } from '../config/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function ProfileForm({ onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigation()

    return (
        <KeyboardAvoidingView 
        behavior="padding"
        style={{ flex: 1, backgroundColor: "white" }}
        keyboardVerticalOffset={50}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: "white" }}> 
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.imageContainer}>
                            <Image source={PROFILE_IMAGES.DEFAULT} style={{ width: 100, height: 100 }}/>
                            <View style={styles.overlay} />
                            <Text style={styles.editText}>Edit</Text>
                        </View>
                    </View>
                    <Formik 
                    initialValues={{ firstName: '', lastName: '', age: '', gender: '', birthday: '', phone: '', email: '' }}
                    onSubmit={async (values) => {
                        setIsSubmitting(true);
                        try {
                            // Check if user is authenticated
                            if (auth.currentUser) {
                                // Reference to user info collection
                                const userInfoRef = collection(db, "users", auth.currentUser.uid, "user info");
                                
                                // Get all documents in the collection (likely just one)
                                const querySnapshot = await getDocs(userInfoRef);
                                
                                // Update the firstName field in each document found
                                const updatePromises = querySnapshot.docs.map(document => {
                                    return updateDoc(doc(db, "users", auth.currentUser.uid, "user info", document.id), {
                                        firstName: values.firstName
                                    });
                                });
                                
                                // Wait for all updates to complete
                                await Promise.all(updatePromises);
                                console.log("First name updated successfully!");
                                
                                // Also update in AsyncStorage if you're using it elsewhere
                                await AsyncStorage.setItem('userFirstName', values.firstName);
                                
                                if (typeof onSubmit === 'function') {
                                    onSubmit(values);
                                }
                                navigation.navigate('Main Tabs', { screen: 'Home' });

                            } else {
                                console.error("No authenticated user found");
                            }
                        } catch (error) {
                            console.error("Error updating first name:", error);
                        } finally {
                            setIsSubmitting(false);
                        }
                        
                    }}
                    >
                        {(formikProps) => (
                            <View>
                                <Text style={styles.label}>First Name</Text>
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Enter your first name"
                                    onChangeText={formikProps.handleChange('firstName')}
                                    value={formikProps.values.firstName}
                                />
                                
                                <Text style={styles.label}>Last Name</Text>
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Enter your last name"
                                    onChangeText={formikProps.handleChange('lastName')}
                                    value={formikProps.values.lastName}
                                />

                                <View style={styles.rowContainer}>
                                    <View style={styles.rowItem}>
                                        <Text style={styles.label}>Age</Text>
                                        <TextInput 
                                            style={styles.input}
                                            placeholder="Enter your age"
                                            keyboardType="numeric"
                                            onChangeText={formikProps.handleChange('age')}
                                            value={formikProps.values.age}
                                        />
                                    </View>
                                    
                                    <View style={styles.rowItem}>
                                        <Text style={styles.label}>Gender</Text>
                                        <TextInput 
                                            style={styles.input}
                                            placeholder="Enter your gender"
                                            onChangeText={formikProps.handleChange('gender')}
                                            value={formikProps.values.gender}
                                        />
                                    </View>
                                </View>

                                <Text style={styles.label}>Birthday</Text>
                                <TextInput 
                                style={styles.input}
                                placeholder="MM/DD/YYYY"
                                onChangeText={formikProps.handleChange('birthday')}
                                value={formikProps.values.birthday}
                                />

                                <Text style={styles.label}>Phone Number</Text>
                                <TextInput 
                                style={styles.input}
                                placeholder="Enter your phone number"
                                keyboardType="phone-pad"
                                onChangeText={formikProps.handleChange('phone')}
                                value={formikProps.values.phone}
                                />

                                <Text style={styles.label}>Email</Text>
                                <TextInput 
                                style={styles.input}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={formikProps.handleChange('email')}
                                value={formikProps.values.email}
                                />

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity 
                                        onPress={formikProps.handleSubmit}
                                        style={[styles.button, isSubmitting && styles.buttonDisabled]}
                                        disabled={isSubmitting}
                                    >
                                        <Text style={styles.buttonText}> {isSubmitting ? "Saving..." : "Update Profile"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container : {
        justifyContent: "center",
        paddingHorizontal: 20,
        marginBottom: 5,
        marginTop: 0,
        backgroundColor: "white"
    },
    header: {
        marginVertical: 20,
        alignSelf:"center"
    },
    form :{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4 
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "500",
        marginHorizontal: 10,
        marginTop: 10
    },
    input: {
        height: 60,
        marginBottom: 15,
        shadowColor: '#151515',
        shadowOffset: { width: 0, height: 2 },
        //shadowOpacity: .1,
        shadowRadius: 3,
        elevation: 2,
        borderWidth: 0,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        backgroundColor: '#E5E5E6',
        fontSize: 16,
    },
    buttonContainer: {
        margin: 40,
        
    },
    button: {
        backgroundColor: '#24A866',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
        opacity: 0.7,
      },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 25,
    },
    rowItem: {
        flex: 1,
    },
    imageContainer:{
        position:'relative',
        width:100,
        height:100,
        
    },
    editText:{
        position:'absolute',
        alignSelf:'center',
        paddingVertical:50,
        color:"white",
        fontWeight:600,
        fontSize:14,
        letterSpacing:1
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent grey overlay
        borderRadius:100
        }
});