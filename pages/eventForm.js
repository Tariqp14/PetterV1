import {View, TextInput, Text,Button,StyleSheet} from "react-native";
import React from "react";
import { Formik } from "formik";
import { getDate } from "../timelineEvents";
export default function AddEventForm({onSubmit}) {
    
    return(
        <View style = {styles.container}>
            <Formik 
            initialValues={{ start: getDate(), end: getDate(), title:'', summary:'', color:''}}
            onSubmit={(values) => {
                onSubmit(values);
            }}
            >
                {(formikProps) =>(
                    <View>
                        <Text style = {styles.label}>Start Time</Text>
                        <TextInput 
                        style = {styles.input}
                        placeholder="Start Time"
                        onChangeText={formikProps.handleChange('start')}
                        value = {formikProps.values.start}
                        />

                        <Text style = {styles.label}>Label</Text>
                        <TextInput 
                        style = {styles.input}
                        placeholder="Event Title"
                        onChangeText={formikProps.handleChange('title')}
                        value = {formikProps.values.title}
                        />

                        <Text style = {styles.label}>Label</Text>  
                        <TextInput 
                        style = {styles.input}
                        placeholder="Event Info"
                        onChangeText={formikProps.handleChange('summary')}
                        value = {formikProps.values.summary}
                        />

                        <Text style = {styles.label}>End Time</Text>
                        <TextInput 
                        style = {styles.input}
                        placeholder="End Time"
                        onChangeText={formikProps.handleChange('end')}
                        value = {formikProps.values.end}
                        />
                        
                        <Text style = {styles.label}>Label</Text>
                        <TextInput 
                        style = {styles.input}
                        placeholder="Color"
                        onChangeText={formikProps.handleChange('color')}
                        value = {formikProps.values.color}
                        />

                        <Button title="Submit" color="blue" onPress={formikProps.handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        //flex:1,
        justifyContent: "center",
        paddingHorizontal: 20,
        marginBottom: 5,
        marginTop: 35,
       //backgroundColor: "#f5f5f5"
    },
    form :{
        backgroundColor: "white",
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
        fontWeight: "bold"
    },
    input: {
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 15,
        padding: 10, 
        borderRadius: 5,
        
    },
});