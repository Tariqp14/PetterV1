// Updated profile page. Fixed error that prevented from saving new profiles -Alisa
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import ProfileCreator from "../pages/Profile-Creator";
import PetForm from "../components/Pet-Form";
// Imports Firestore functions and Firebase config
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import EditForm from "./displayProfile";
const Stack = createNativeStackNavigator();



//profile function hold the info/components for the page
export default function Profile() {
  //setting up navigation to profile creation page -T
  //guide i used for creating the navigation https://reactnative.dev/docs/navigation -T
  //gave code to chatgpt because I forgot to add "const navigation = useNavigation();" it gave me this as a solution to make the page functional -T

  return (
    //top view houses everything -T
    //goal is to remove this and add it to navigation eventually
    <>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Info"
              component={Info}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile-Creator"
              component={ProfileCreator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Edit-Profile"
              component={EditForm}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </>
  );
}

// The following component was previously used to display a single pet profile
// from route parameters. Kept for reference but not used in the current implementation.
// const PetCardDisplay = () => {
//   const route = useRoute();
//   const petData = route.params?.petData || {};
//   return (
//     <View style={styles.petdisplay}>
//       <View style={styles.petcard}>
//         <Image
//           source={{ uri: petData.Image }}
//           style={{
//             width: 120,
//             height: 130,
//             borderRadius: 6,
//             alignSelf: "center",
//             marginTop: 20,
//           }}
//         />
//         <Text style={{ marginTop: 5, textAlign: "center" }}>
//           {petData.Name || "N/A"}
//         </Text>
//       </View>
//     </View>
//   );
// };

//image function checks if name and image have been loaded, will be removed later once yup is implemented -T
//conditional rendering https://www.reactnative.express/react/conditional_rendering

function Info() {
  // Removed useRoute() here because we now fetch all pet profiles from Firestore
  // const route = useRoute();
  // const petData = route.params?.petData || {};

  const [pets, setPets] = useState([]);
  const navigation = useNavigation();

  

  // Fetch user pet profiles from Firestore
  useEffect(() => {
    if (auth.currentUser) {
      const petsRef = collection(db, "users", auth.currentUser.uid, "pets");
      const unsubscribe = onSnapshot(
        petsRef,
        (snapshot) => {
          const petProfiles = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPets(petProfiles);
        },
        (error) => {
          console.error("Error fetching pet profiles:", error);
        }
      );
      return () => unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.title}>Your Pets</Text>
      </View>

      {/* Display all pet profiles from Firestore */}
      <ScrollView contentContainerStyle={styles.petDisplay}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <TouchableOpacity key={pet.id} style={styles.petcard} onPress={() => navigation.navigate("Edit-Profile", { petData: pet })}>
              {/* checks if there is a cloudinaryId saved in firebase */}
              {pet.cloudinaryId ? (
              // Use Cloudinary URL if available
              <Image 
               /* this will insert the cloudinaryId saved in firebase into this url. This is the url path to the specific image. The c_fill means crop image to fill 130×120px */
                source={{ 
                  uri: `https://res.cloudinary.com/petterapp/image/upload/c_fill,h_130,w_120/${pet.cloudinaryId}` 
                }} 
                style={styles.petImage} 
              />
            ) : (
              /* Updated Image -- added a conditional that asks if it is saved as a string, if it is, it uses the uri. if its not it uses the default image set. */
              <Image source={typeof pet.Image === 'string' ? { uri: pet.Image } : pet.Image}  style={styles.petImage} />
            )}
              <Text style={styles.petName}>{pet.Name || "N/A"}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noPetsText}>No pet profiles found.</Text>
        )}
      </ScrollView>

      <View style={styles.buttoncontainer}>
        <TouchableOpacity
          style={styles.addbutton}
          onPress={() => navigation.navigate("Profile-Creator")}
        >
          <Image
            source={require("../images/plus.png")}
            style={styles.plusImage}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 12, justifyContent: "center", marginTop: 10 }}>
          Add New Profile
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

//asked chatgpt why plus button wasnt centered and it added a justify content and alignItems to fix the issue -T
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  regular: {
    fontSize: 12,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    flex: 1,
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  petdisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Updated container for displaying multiple pet cards
  petDisplay: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  buttoncontainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addbutton: {
    height: 40,
    width: 40,
    borderRadius: 6,
    backgroundColor: "#ffd885",
    justifyContent: "center",
    alignItems: "center",
  },
  petcard: {
    height: 187,
    width: 149,
    backgroundColor: "#ffd885",
    borderRadius: 6,
    margin: 15,
    alignItems: "center",
    paddingVertical: 10,
  },
  petImage: {
    width: 120,
    height: 130,
    borderRadius: 6,
    alignSelf: "center",
    marginTop: 20,
  },
  petName: {
    marginTop: 5,
    textAlign: "center",
  },
  noPetsText: {
    fontSize: 16,
    color: "#666",
    marginVertical: 20,
  },
  plusImage: {
    width: 24,
    height: 24,
  },
});

/*
Current Tasks -T
Style NavBar somewhat
remove headers
start profile page styling
    background
    title
    buttons
    text

Future Concerns
pet profile card system
storing information

Resources for future implementation
https://reactnavigation.org/docs/getting-started/
*/