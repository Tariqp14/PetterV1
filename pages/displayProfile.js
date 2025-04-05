import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileCreator from "./Profile-Creator";
import PetForm from "../components/Pet-Form";
// Imports Firestore functions and Firebase config
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {Profile} from "./Profile";
import * as yup from 'yup';
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

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

export default function EditForm() {
  const route = useRoute();  // Get the navigation route
  const petData = route.params?.petData || {};  // Retrieve passed pet data
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
      validateOnMount={true}
        validationSchema={petValidationSchema}
        // Updated initialValues: now includes both petType and Breed fields.
        initialValues={{
          Name: petData.Name || "",
          Age: petData.Age || "",
          Gender: petData.Gender || "",
          Image: petData.Image || "",
          petType: petData.petType || "",
          Breed: petData.Breed || "",
        }}
        onSubmit={(values) => {
          console.log("Form Values:", values); // Log the form values for debugging
          try {
            const petRef = doc(db, "users", auth.currentUser.uid, "pets", petData.id);
            updateDoc(petRef, values)
              .then(() => {
                console.log("Pet Profile Updated");
                navigation.navigate("Info");
              })
              .catch((error) => {
                console.error("Error updating pet profile:", error);
              });
          } catch (err) {
            console.error("Form submission error:", err);
          }
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
              <Text style={styles.caption}>Add New Profile</Text>
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
              onPress={async () => {
                console.log("Save pressed");
                const touchedFields = {
                  Name: true,
                  Age: true,
                  Gender: true,
                  petType: true,
                  Breed: true,
                  Image: true,
                };
                props.setTouched(touchedFields);
                await props.validateForm().then((errors) => {
                  console.log("Validation errors:", errors);
                  if (Object.keys(errors).length === 0) {
                    props.handleSubmit(); 
                  } else {
                    console.log("Form has validation errors.");
                  }
                });
              }}
            >
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.deletebutton}
            >
              <Text>Delete</Text>
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
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    overflow: "hidden", // Enforces the borderRadius
  },
  picker: {
    color: "#000",
  },
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
  deletebutton: {
    backgroundColor: "#FF4040",
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
});