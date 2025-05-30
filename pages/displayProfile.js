import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileCreator from "./Profile-Creator";
import PetForm from "../components/Pet-Form";
// Imports Firestore functions and Firebase config
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
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

function AllergyStorage (breed) {
  const allergies = {
    Bulldog: [
      "Contact Dermatitis",
      "Flea Allergy Dermatitis",
      "Certain protein sources found in beef, chicken, or dairy.",
      "Grains like wheat or corn, which are common in many dog foods.",
      "Pollen",
      "Dust Mites",
      "Mold",
    ],
    Chihuahua: [
      "Pollen",
      "Mold",
      "Fleas",
      "Use air purifiers to reduce airborne allergens.",
      "Avoid walking in high-pollen areas during peak seasons.",
    ],
    Dachshund: [
      "Certain protein sources found in beef, chicken, or dairy.",
      "Grains like wheat or corn, which are common in many dog foods.",
      "Fleas",
      "Carpet deodorizers.",
      "Chemicals used in some types of dog bedding",
    ],
    GermanShepherd: [
      "Pollen from trees, grasses, and weeds",
      "Dust mites",
      "Mold",
      "Dander",
    ],
    GoldenRetriever: [
      "Pollen from trees, grasses, and weeds",
      "Dust mites",
      "Mold",
      "Dander",
    ],
    AmericanShorthair: [
      "Pollen",
      "Fleas",
      "Pollen",
      "Certain protein sources found in beef, chicken, fish, or dairy",
      "Grains like wheat or corn, which are common in many cat foods.",
    ],
    BritishShorthair: [
      "Pollen",
      "Fleas",
      "Pollen",
      "Certain protein sources found in beef, chicken, fish, or dairy",
      "Grains like wheat or corn, which are common in many cat foods.",
    ],
    MaineCoon: [
      "Pollen",
      "Fleas",
      "Pollen",
      "Mold",
      "Pollen",
      "Dust Mites",
      "Mold",
    ],
    Persian: [
      "Pollen",
      "Dust Mites",
    ],
    SphynxCat: [
      "Sensitivity to temperature changes",
      "Acne",
      "Dermatitis",
      "Perfumes",
      "Pollen",
      "Certain types of fabrics",
    ],
  }

return allergies[breed] || []; 
}


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
  const [breedAllergies, setBreedAllergies] = useState([]);
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
    // Used Copilot to take Jareds code for the image upload and modify it to work with the new image picker. -T
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
    <ScrollView>

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
        onSubmit={async (values) => {
          console.log("Form Values:", values); // Log the form values for debugging
          try {
            const petRef = doc(db, "users", auth.currentUser.uid, "pets", petData.id);
        
            // Check if a new image is selected
            if (values.Image !== petData.Image) {
              console.log("New image selected, uploading to Cloudinary...");
              const cloudinaryId = await uploadToCloudinary(values.Image);
        
              if (cloudinaryId) {
                // Update Firestore with the new Cloudinary ID
                values.cloudinaryId = cloudinaryId;
                console.log("Cloudinary ID updated:", cloudinaryId);
              } else {
                console.error("Failed to upload image to Cloudinary.");
                alert("Failed to upload image. Please try again.");
                return;
              }
            }
        
            // Update Firestore with the new values
            await updateDoc(petRef, values);
            console.log("Pet Profile Updated");
            navigation.navigate("Info");
          } catch (err) {
            console.error("Form submission error:", err);
            alert("Failed to update pet profile. Please try again.");
          }
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(props,) => { // Used ChatGPT to edit allergy function, took function activated by a button press and changed it into a useEffect for when the screen updates.
          useEffect(() => {
              const selectedBreed = props.values.Breed;
              if (selectedBreed) {
                const allergies = AllergyStorage(selectedBreed);
                setBreedAllergies(allergies);
              } else {
                setBreedAllergies([]);
              }
            }, [props.values.Breed]);
          return(
          
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
                  value="GoldenRetriever"
                />
                <Picker.Item label="German Shepherd" value="GermanShepherd" />
                <Picker.Item label="Dachshund" value="Dachshund" />
                <Picker.Item label="Chihuahua" value="Chihuahua" />
                <Picker.Item
                  label="American Shorthair"
                  value="AmericanShorthair"
                />
                <Picker.Item
                  label="British Shorthair"
                  value="BritishShorthair"
                />
                <Picker.Item label="Maine Coon" value="MaineCoon" />
                <Picker.Item label="Persian" value="Persian" />
                <Picker.Item label="Sphynx Cat" value="SphynxCat" />
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
            <View style={styles.allergybox}>
              {breedAllergies.length > 0 ? (
                <>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
              Known Allergies for {props.values.Breed}:
              </Text>
              {breedAllergies.map((item, index) => (
                <Text key={index} style={styles.regular}>• {item}</Text>
              ))}
              </>
              ) : (
                   <Text style={styles.regular}>No known allergies for this breed.</Text>
                  )}
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
            onPress={async () => {
              try {
                const petRef = doc(db, "users", auth.currentUser.uid, "pets", petData.id);
                deleteDoc(petRef)
                  .then(() => {
                    console.log("Pet Profile Deleted");
                    navigation.navigate("Info");
                  })
                  .catch((error) => {
                    console.error("Error deleting pet profile:", error);
                  });
              } catch (err) {
                console.error("Error deleting pet profile:", err);
              }

            }}
            >
              <Text>Delete</Text>
            </TouchableOpacity>

          </View>
          )
        }}
      </Formik>
      <StatusBar style="auto" />
    </View>
    </ScrollView>
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
  allergybox: {
    backgroundColor: "#fff",
    width: "100%",
    height: 180,
    borderRadius: 6,
    marginTop: 20,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
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