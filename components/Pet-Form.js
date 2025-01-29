import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import  * as ImagePicker  from 'expo-image-picker';
//This file had assistance from CoPilots autofill feature.
//Guide for the Formik portion https://youtu.be/t4Q1s8WntlA 
//resources for image part https://youtu.be/DQV9CtptMYs
//resources for image part https://docs.expo.dev/versions/latest/sdk/imagepicker/
export default function PetForm() {
    const pickImage = async (setFieldValue) => {// ChatGPT and CoPilot used to help with error resulting from incorrect import and incorrect function call. -T
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log("Permission Result:", permissionResult);//shows the permission result in the console
            if (!permissionResult.granted) {//if the permission is not granted, an alert will pop up
                alert('Permission to access media library is required!');
                return;
            }
    
            let result = await ImagePicker.launchImageLibraryAsync({ //guidlines for the image after its choosen
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            console.log(result);
            if (!result.canceled) { //if else for if the image is selected or not
                setFieldValue('Image', result.uri);
            } else {
                alert('Nothing selected!');
            }
        };
    
    return (
        <View style={styles.container}>
            <Formik
                 initialValues={{ Name: '', Age: '', Gender: '', Image: '' }} //initial values for the form
                 onSubmit={(values) => { //logs values on the submission of the form
                    console.log(values);
                }}
             >
                {(props) => (
                    <View style={styles.formbox}>
                        <View style ={styles.picturebackground}>
                            <Image
                            source={require('../images/dogfood.png')}
                            ></Image>
                        </View>
                        <Button
                            title="Add Pet Photo"
                            onPress={() => pickImage(props.setFieldValue)}
                        />
                        <TextInput
                        placeholder="Name"
                        onChangeText={props.handleChange('Name')}
                        value={props.values.Name}
                        />
                        <View style={styles.aspect}>
                        <TextInput
                        style={styles.textbox1}
                        placeholder="Age"
                        onChangeText={props.handleChange('Age')}
                        value={props.values.Age}
                        />
    
                        <TextInput
                        style={styles.textbox1}
                        placeholder="Gender"
                        onChangeText={props.handleChange('Gender')}
                        value={props.values.Gender}
                        />
                        </View>
                        <TouchableOpacity style={styles.savebutton} onPress={props.handleSubmit}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
         </View>
    );
}


const styles = StyleSheet.create({
    container: {

      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    regular: {
        fontSize: 12,
      },
    title: {
        fontSize: 26,
        textAlign:"center",
        flex: 1,
    },
    formbox: {
        backgroundColor: '#ffd885',
        marginTop: 30,
        width: '100%',
        alignSelf: 'center',
        padding: 20,
    },
    aspect: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    textbox1: {
        backgroundColor: "#fff",
        width:150,
        height: 45,
        borderRadius: 6,
    },
    savebutton: {
        backgroundColor: "#fff",
        borderRadius: 6,
        width:118,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 50
    },
    picturebackground: {
        backgroundColor: "#fff",
        width: 200,
        height: 200,
        borderRadius: 75,
        alignSelf: 'center',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });