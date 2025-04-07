import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Platform
} from "react-native";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as yup from 'yup';
// Imports Firestore functions and authentication object
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

import { useState } from "react";
//This file had assistance from CoPilots autofill feature.
//Guide for the Formik portion https://youtu.be/t4Q1s8WntlA
//resources for image part https://youtu.be/DQV9CtptMYs
//resources for image part https://docs.expo.dev/versions/latest/sdk/imagepicker/
//resources for image part https://stackoverflow.com/questions/70816914/trouble-asking-for-permission-with-expo-image-picker


const petValidationSchema = yup.object().shape({
    Name: yup
      .string()
      .required('Please enter a name for your pet'),
    Age: yup
      .string()
      .required('Please enter your pets age'),
    Gender: yup
      .string()
      .required('Please enter a gender'),

  });

export default function PetForm() {
  const navigation = useNavigation();
  const pickImage = async (setFieldValue) => {
    // ChatGPT and CoPilot used to help with error resulting from incorrect import and incorrect function call. -T
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Permission Result:", permissionResult); //shows the permission result in the console
    if (!permissionResult.granted) {
      //if the permission is not granted, an alert will pop up
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      //guidlines for the image after its choosen
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      //image was failing to load, chatgpt suggested to add the "if (!result.canceled && result.assets && result.assets.length > 0"
      const imageUri = result.assets[0].uri; // Correctly access the URI
      setFieldValue("Image", imageUri);
      console.log("Selected Image URI:", imageUri); //Console log to bugtest
    } else {
      alert("Nothing selected!");
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={petValidationSchema}
        // Updated initialValues: now includes both petType and Breed fields.
        initialValues={{
          Name: "",
          Age: "",
          Gender: "",
          Image: "",
          petType: "",
          Breed: "",
        }}
        onSubmit={(values) => {
          // Save pet data under current user's 'pets' subcollection
          addDoc(collection(db, "users", auth.currentUser.uid, "pets"), values)
            .then(() => {
              console.log("Pet profile added!");
              navigation.navigate("Info", { petData: values });
            })
            .catch((error) => console.error("Error adding pet:", error));
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(props,) => (
          <View style={styles.formbox}>
            <View style={styles.picturebackground}>
              <Image
                style={styles.image}
                source={{ uri: props.values.Image }}
              />
              <TouchableOpacity
                style={styles.addbutton}
                onPress={() => pickImage(props.setFieldValue)}
              >
                <Image source={require("../images/plus.png")} />
              </TouchableOpacity>
              
                {/* Updated */}
              <View style = {styles.textWrapper}>
              <Text style={styles.caption}>Add Profile Image</Text>
              </View>
              
            </View>
            <TextInput
              style={styles.name}
              placeholder="Name"
              onChangeText={props.handleChange("Name")}
              value={props.values.Name}
            />
            {props.errors.Name && props.touched.Name && (<Text style={styles.errorText}>{props.errors.Name}</Text>)}
            {/* Picker for pet type: separate field for Dog/Cat */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={props.values.petType}
                style={styles.picker}
                onValueChange={(itemValue) =>
                  props.setFieldValue("petType", itemValue)
                }
              >
                <Picker.Item label="Select Pet Type" value="" />
                <Picker.Item label="Dog" value="dog" />
                <Picker.Item label="Cat" value="cat" />
              </Picker>
            </View>
            {/* Picker for breed: using the ones from the initial form */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={props.values.Breed}
                style={styles.picker}
                onValueChange={(itemValue) =>
                  props.setFieldValue("Breed", itemValue)
                }
              >
                <Picker.Item label="Bulldog" value="Bulldog" />
                <Picker.Item
                  label="Golden Retriever"
                  value="Golden Retriever"
                />
                <Picker.Item label="German Shepherd" value="German Shepherd" />
                <Picker.Item label="Dachshund" value="Dachshund" />
                <Picker.Item label="Chihuahua" value="Chihuahua" />
                <Picker.Item
                  label="American Shorthair"
                  value="American Shorthair"
                />
                <Picker.Item
                  label="British Shorthair"
                  value="British Shorthair"
                />
                <Picker.Item label="Maine Coon" value="Maine Coon" />
                <Picker.Item label="Persian" value="Persian" />
                <Picker.Item label="Sphynx Cat" value="Sphynx Cat" />
              </Picker>
            </View>
            
            <View style={styles.bottombox}>
              <View style={styles.row}>
                <TextInput
                  style={styles.textbox1}
                  placeholder="Age"
                  onChangeText={props.handleChange("Age")}
                  keyboardType="numeric"
                  value={props.values.Age}
                />
                <TextInput
                  style={styles.textbox1}
                  placeholder="Gender"
                  onChangeText={props.handleChange("Gender")}
                  value={props.values.Gender}
                />
              </View>

              <View style={styles.row2}>
                <View style={styles.errorView}>
                  {props.errors.Age && props.touched.Age && (<Text style={styles.errorText}>{props.errors.Age}</Text>)}
                </View>
                <View style={styles.errorView}>
                  {props.errors.Gender && props.touched.Gender && (<Text style={styles.errorText}>{props.errors.Gender}</Text>)}
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.savebutton}
              onPress={props.handleSubmit}
            >
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    width: "100%",
    height: 45,
    borderRadius: 6,
    marginTop: 20,
    alignSelf: "center",
    borderWidth: 0,
    borderColor: "#ccc",
    justifyContent: "center",
    overflow: "hidden", // Enforces the borderRadius
  },
  // added different styling for ios and android
  picker: Platform.select({
    ios: {
      color: "#000",
      width: "110%",
      marginLeft: -15, // Different values for iOS
      paddingHorizontal: 0,
    },
    android: {
      color: "#000",
      width: "100%",
      padding: 0,
      margin: 0,
    }
  }),
  regular: {
    fontSize: 12,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    flex: 1,
  },
  name: {
    backgroundColor: "#fff",
    width: "100%",
    height: 45,
    borderRadius: 6,
    marginTop: 20,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  formbox: {
    backgroundColor: "#ffd885",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    padding: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  bottombox: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  textbox1: {
    backgroundColor: "#fff",
    width: 150,
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  errorView: {
    width: 150,
    height: 30,
  },
  savebutton: {
    backgroundColor: "#fff",
    borderRadius: 6,
    width: 118,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  picturebackground: {
    backgroundColor: "#fff",
    borderRadius: 6,
    width: "100%",
    height: 200,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 6, // adds border radius to uploaded image
  },
  addbutton: {
    height: 40,
    width: 40,
    borderRadius: 6,
    backgroundColor: "#ffd885",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //chatgpt suggested to use position absolute to place the button on top of the image
    marginBottom: 5,
    zIndex: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 5,
  },
  textWrapper:{
    position: "absolute", // the reason the text was so far down was because it was positioned relatively making it fall just below the image. 
    bottom: 30,
     backgroundColor: 'rgba(255, 255, 255, 0.7)',
     paddingHorizontal: 10,
     paddingVertical: 5,
     borderRadius: 4,
  },
});

/* 
  Note for attempting to create pet form cards dynamically
  I want each pet card to be loaded upon submission of the form to the profile page
  These cards will display a picture and name from the data
  The cards will be touchable and will navigate to an editing page that will allow the user to edit the pet's information
  This version of the page will have a delete button that will remove the card from the profile page psuedocode for the card to help me think

  */