import { View, TextInput, Text, Button, StyleSheet, ScrollView, KeyboardAvoidingView,Image,TouchableOpacity } from "react-native";
import React from "react";
import { Formik } from "formik";
import { PROFILE_IMAGES } from '../components/profile-Images'; 

export default function ProfileForm({ onSubmit }) {
    
    return (
        <KeyboardAvoidingView 
        behavior="padding"
        style={{ flex: 1, backgroundColor: "white" }}
        keyboardVerticalOffset={50}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: "white" }}> 
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={PROFILE_IMAGES.OUTLINE} style={{ width: 100, height: 100 }}/>
                    </View>
                    <Formik 
                    initialValues={{ firstName: '', lastName: '', age: '', gender: '', birthday: '', phone: '', email: '' }}
                    onSubmit={(values) => {
                        onSubmit(values);
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
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>Finish</Text>
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
    }
});