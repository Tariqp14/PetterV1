import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as yup from 'yup';
// Imports Firestore functions and authentication object
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

//import { cld } from "../config/cloudinary";

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

  //function for uploading images to server
  const uploadToCloudinary = async (uri) => {
    // Create a form for the upload. FormData is a  special JavaScript interface.
    const formData = new FormData();
    // this takes the last part of the file after the '/' as the file name. Example: From /Users/photos/dog.jpg it gets dog.jpg
    const filename = uri.split('/').pop();
    
    // Prepare the image file. This is going to tell Cloudinary what it is saving and how to save it. 
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: filename || 'pet_image.jpg',
    });
    
    // Tells Cloudinary which preset configuration to use. Presets are a set of rules on how to handle the image upload. 
    formData.append('upload_preset', 'pet_images');
    
    try {
      // Upload to Cloudinary. Uses Cloudinary's built in api. 
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/petterapp/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      // pulls the public_id from the response data
      const data = await response.json();
      
      if (!data.public_id) {
        console.error("Missing public_id in response", data);
        alert("Image upload failed. Please try again.");
        return null;
      }
  
      console.log("Cloudinary upload success:", data.public_id);
      return data.public_id;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert("Image upload failed. Please try again.");
      return null;
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
          cloudinaryId: "", // this wont be displayed in the form felids. It just gives a location to save the id so that it can be accessed later to display its corresponding image. 
        }}
        onSubmit={async (values,{resetForm}) => {
        
          try {
            // Check if an image is selected
            if (!values.Image) {
              alert("Please select an image for your pet.");
              return;
            }
            
            // First save with local image URI for immediate display
            const tempPetData = { 
              ...values,
              // Flag to indicate background upload in progress
              // this lets me know if the upload has gone through or not
              uploadPending: true 
            };
            const fields = {
                feedTimes: [],
                foodType: {
                  name: "",
                  amount: "",
                  meals: 0
                }
              }
              Object.assign(tempPetData, fields)
            // Save to Firestore with just uri first to get the document ID
            const docRef = await addDoc(
              collection(db, "users", auth.currentUser.uid, "pets"), 
              tempPetData
            );
            
            console.log("Pet profile added with local image!");
            
            // Navigate to the info page with the data
            navigation.navigate("Info", { petData: tempPetData });
            
            // Reset the form now that we've navigated away
            resetForm();
            
            // Now upload to Cloudinary in the background
            console.log("Starting background upload to Cloudinary...");
            const cloudinaryId = await uploadToCloudinary(values.Image);
            
            if (cloudinaryId) {
              // Update the Firestore document with the Cloudinary ID
              await updateDoc(doc(db, "users", auth.currentUser.uid, "pets", docRef.id), {
                cloudinaryId: cloudinaryId,
                uploadPending: false // Mark upload as complete
              });
              console.log("Background upload complete, document updated with cloudinaryId");
            } else {
              console.error("Background upload failed");
            }
          } catch (error) {
            console.error("Error in pet profile process:", error);
            alert("There was an issue saving your pet profile.");
          }
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(props,) => (
          <View style={styles.formbox}>
            <View style={styles.picturebackground}>
              <ImageBackground
                style={styles.image}
                source={{ uri: props.values.Image }}
              >
              <TouchableOpacity
                style={styles.addbutton}
                onPress={() => pickImage(props.setFieldValue)}
              >
                <Image source={require("../images/plus.png")} />
              </TouchableOpacity>
              <Text style={styles.caption}>Add New Profile</Text>
              </ImageBackground>
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
    </View >
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
    alignItems: "center",
    justifyContent: "center",
  },
  addbutton: {
    height: 40,
    width: 40,
    borderRadius: 6,
    backgroundColor: "#ffd885",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    zIndex: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  caption: {
    fontSize: 18,
    justifyContent: "center",
    marginTop: 15,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 5,
  },
});

/* 
  Note for attempting to create pet form cards dynamically
  I want each pet card to be loaded upon submission of the form to the profile page
  These cards will display a picture and name from the data
  The cards will be touchable and will navigate to an editing page that will allow the user to edit the pet's information
  This version of the page will have a delete button that will remove the card from the profile page psuedocode for the card to help me think

  */