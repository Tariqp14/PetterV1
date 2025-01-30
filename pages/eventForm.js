import {View, TextInput, Text, Button, StyleSheet, ScrollView, KeyboardAvoidingView} from "react-native";
import React from "react";
import { Formik } from "formik";
import { getDate } from "../timelineEvents";
export default function AddEventForm({onSubmit}) {
    
    return(
        <KeyboardAvoidingView 
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
                <View style = {styles.container}>
                    <Formik 
                    initialValues={{ start: getDate(), end: getDate(), title:'', summary:'', color:''}}
                    onSubmit={(values) => {
                        onSubmit(values);
                    }}
                    >
                        {(formikProps) =>(
                            <View>
                                <Text style = {styles.label}>Event Title</Text>
                                <TextInput 
                                style = {styles.input}
                                placeholder="Event Title"
                                onChangeText={formikProps.handleChange('title')}
                                value = {formikProps.values.title}
                                />

                                <Text style = {styles.label}>Start Date & Time</Text>
                                <TextInput 
                                style = {styles.input}
                                placeholder="Start Time"
                                onChangeText={formikProps.handleChange('start')}
                                value = {formikProps.values.start}
                                />

                                <Text style = {styles.label}>End Date & Time</Text>
                                <TextInput 
                                style = {styles.input}
                                placeholder="End Time"
                                onChangeText={formikProps.handleChange('end')}
                                value = {formikProps.values.end}
                                />

                                <Text style = {styles.label}>Color</Text>
                                <TextInput 
                                style = {styles.input}
                                placeholder="Color"
                                onChangeText={formikProps.handleChange('color')}
                                value = {formikProps.values.color}
                                />

                                <Text style = {styles.label}>Event Info</Text>  
                                <TextInput 
                                style = {styles.input}
                                placeholder="Event Info"
                                onChangeText={formikProps.handleChange('summary')}
                                value = {formikProps.values.summary}
                                />
                                <View style={styles.button}>
                                <Button title="Submit" color="black" onPress={formikProps.handleSubmit} />
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
        //flex:1,
        justifyContent: "center",
        paddingHorizontal: 20,
        marginBottom: 5,
        marginTop: 35,
       backgroundColor: "#E8E8E8"
    },
    form :{
        backgroundColor: "#E8E8E8",
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width:0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius:4 
    },
    label: {
        fontSize:16,
        marginBottom: 5,
        fontWeight: "500",
        marginHorizontal:10,
        marginTop:10
    },
    input: {
        height: 60,
        marginBottom: 15,
        shadowColor: '#151515',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .1,
        shadowRadius: 3,
        elevation: 2,
        borderWidth: 0,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        backgroundColor: 'white',
        fontSize: 16,
    },
    button:{
        margin:40,
        shadowColor: '#151515',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: .2,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 0,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
    }
});