import { Image, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView,ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {AntDesign} from '@expo/vector-icons/';
import {Octicons} from '@expo/vector-icons/';
import {Fontisto} from '@expo/vector-icons/';
import * as yup from 'yup';
import { PROFILE_IMAGES,AVATAR_OPTIONS,setSelectedAvatar } from '../components/profile-Images';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileContext } from '../BottomTab';
import { useContext } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// used ai for help with focused felids. Left comments to help explain the code 


const loginValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2,'You need 2 characters')
      .required('First name is required'),
    lastName: yup
      .string()
      .min(2,'You need 2 characters'),
    age: yup
      .string(),
    type: yup
      .string(),
    selectedAvatar: yup
    .string()
    .required('Please select an avatar')
    .nullable(false) //makes it so the null felids have to have a value. This prevents validation from succeeding when nothing has been selected 
  });

export default function SignUpScreen1({route}) {
  
  const navigation = useNavigation();
  const [focusedField, setFocusedField] = useState(null);
  const { setProfileSetupComplete } = useContext(ProfileContext);

  return (
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView 
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={50}>
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Header Text */}
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>Let's get</Text>
          <Text style={styles.mainText}>some more</Text>
          <Text style={styles.mainText}>info!</Text>
        </View>

        <View style={styles.containerForm}>
          <Formik 
            validationSchema={loginValidationSchema}
            initialValues={{ firstName:'', lastName:'', age:'', type:'', selectedAvatar: '' }}
            validateOnMount={true} // this runs validation immediately 
            onSubmit={(values) => {
              onSubmit(values);
            }}>
            {/* still need to implement form submission*/}
            {({handleChange, handleBlur, handleSubmit, values, errors, isValid, touched,setFieldValue,setTouched}) => (
              <View style={styles.inputContainerBig}>

              {/* First Name - Required Field */}
              <View style={[
                styles.inputContainer,
                /* Apply selected/focus styling when this field is currently active*/
                focusedField === 'firstName' ? styles.inputContainerSelected : null,
                /*  Apply error styling when field has been touched and contains validation errors */
                touched.firstName && errors.firstName ? styles.inputError : 
                /* Apply success styling when field has been touched and passes validation */
                touched.firstName && !errors.firstName ? styles.inputSuccess : null
              ]}>
                <Octicons name="person" size={19} color="grey" style={styles.icon} />
                <TextInput 
                  style={styles.input}
                  placeholder="First Name"
                  onChangeText={handleChange('firstName')}
                  // When input is focused, set 'firstName' as active field for styling purposes
                  onFocus={() => setFocusedField('firstName')}
                  // When focus leaves the input:
                  onBlur={(e) => {
                    // 1. Notify Formik that field was touched (triggers validation)
                    handleBlur('firstName')(e);
                    // 2. Clear the focused state to remove highlight styling
                    setFocusedField(null);
                  }}
                  value={values.firstName}
                />
                {touched.firstName && !errors.firstName && (
                  <AntDesign name="checkcircle" size={16} color="green" style={styles.validIcon} />
                )}
              </View>
              {/* this shows the error message */}
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}

                 {/* Last Name - Optional Field */}
                 <View style={[
                  styles.inputContainer,
                  focusedField === 'lastName' ? styles.inputContainerSelected : null,
                  touched.lastName && errors.lastName ? styles.inputError : 
                  touched.lastName && !errors.lastName ? styles.inputSuccess : null
                ]}>
                  <Octicons name="person" size={19} color="grey" style={styles.icon} />
                  <TextInput 
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={handleChange('lastName')}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={(e) => {
                      handleBlur('lastName')(e);
                      setFocusedField(null);
                    }}
                    value={values.lastName}
                  />
                  {touched.lastName && !errors.lastName && values.lastName && (
                    <AntDesign name="checkcircle" size={16} color="green" style={styles.validIcon} />
                  )}
                </View>
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
                
                {/* Pet Type - Optional Field */}
                <View style={[
                  styles.inputContainer,
                  focusedField === 'type' ? styles.inputContainerSelected : null,
                  touched.type && errors.type ? styles.inputError : 
                  touched.type && !errors.type && values.type ? styles.inputSuccess : null
                ]}>
                  <MaterialCommunityIcons name="paw" size={19} color="grey" style={styles.icon} />
                  <TextInput 
                    style={styles.input}
                    placeholder="Pet Type"
                    onChangeText={handleChange('type')}
                    onFocus={() => setFocusedField('type')}
                    onBlur={(e) => {
                      handleBlur('type')(e);
                      setFocusedField(null);
                    }}
                    value={values.type}
                  />
                  {touched.type && !errors.type && values.type && (
                    <AntDesign name="checkcircle" size={16} color="green" style={styles.validIcon} />
                  )}
                </View>
                
                {/* Pet Age - Optional Field */}
                <View style={[
                  styles.inputContainer,
                  focusedField === 'age' ? styles.inputContainerSelected : null,
                  touched.age && errors.age ? styles.inputError : 
                  touched.age && !errors.age && values.age ? styles.inputSuccess : null
                ]}>
                  <Octicons name="number" size={19} color="grey" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Pet age"
                    keyboardType="numeric"
                    onChangeText={handleChange('age')}
                    onFocus={() => setFocusedField('age')}
                    onBlur={(e) => {
                      handleBlur('age')(e);
                      setFocusedField(null);
                    }}
                    value={values.age}
                  />
                  {touched.age && !errors.age && values.age && (
                    <AntDesign name="checkcircle" size={16} color="green" style={styles.validIcon} />
                  )}
                </View>
                  
                  {/* Profile Picture Avatar Selection  */}
                <Text style={styles.profilePictureLabel}>Choose Your Avatar</Text>

                {touched.selectedAvatar && errors.selectedAvatar && (
                <Text style={styles.errorTextAvatar}>{errors.selectedAvatar}</Text>
              )}
                
               
                <View style={[styles.buttonContainerSocial, 
                  touched.selectedAvatar && errors.selectedAvatar ? styles.inputError : 
                  touched.selectedAvatar && !errors.selectedAvatar && values.selectedAvatar ? styles.inputSuccess : null]
                }>
                    <TouchableOpacity 
                      style={[
                        styles.buttonSocial,
                        values.selectedAvatar === 'greenShirt' && styles.selectedAvatar
                      ]} 
                      onPress={() => {
                        setFieldValue('selectedAvatar', 'greenShirt');
                        setSelectedAvatar('greenShirt');
                      }}
                    >
                      <View style={styles.buttonLayout}>
                        <Image 
                          source={AVATAR_OPTIONS.greenShirt.default}
                          style={styles.profileImage}
                        />
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.buttonSocial,
                        values.selectedAvatar === 'yellowShirt' && styles.selectedAvatar
                      ]}
                      onPress={() => {
                        setFieldValue('selectedAvatar', 'yellowShirt');
                        setSelectedAvatar('yellowShirt');
                      }}
                    >
                      <View style={styles.buttonLayout}>
                        <Image 
                          source={AVATAR_OPTIONS.yellowShirt.default}
                          style={styles.profileImage}
                        />
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.buttonSocial,
                        values.selectedAvatar === 'blackShirt' && styles.selectedAvatar
                      ]}
                      onPress={() => {
                        setFieldValue('selectedAvatar', 'blackShirt');
                        setSelectedAvatar('blackShirt');
                      }}
                    >
                      <View style={styles.buttonLayout}>
                        <Image 
                          source={AVATAR_OPTIONS.blackShirt.default}
                          style={styles.profileImage}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                
                <View style={styles.buttonContainerLogin}>
                  <TouchableOpacity 
                    style={styles.buttonLogin}
                    /* this will be for errors and validation. Disables the button if form is not valid */
                     //disabled={!isValid} 
                    onPress={() => {
                      setTouched({
                        firstName: true,
                        lastName: true,
                        type: true,
                        age: true,
                        selectedAvatar: true
                      });
                      console.log("Form valid?", isValid);
                      console.log("Form errors:", errors);
                      console.log("Form values:", values);
                      
                      // Check if required inputs are filled out and if so Mark profile setup as complete and save user data to firestore
                      if (isValid) {
                        console.log("Form is valid, setting profile complete");
                        // Capitalize the first name before saving it
                        const capitalizedFirstName = values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1);
                        
                        if (auth.currentUser){
                          addDoc(collection(db,"users",auth.currentUser.uid,"user info"),{
                            ...values,
                            firstName:capitalizedFirstName,
                          })
                          .then(()=>{
                            console.log("User info saved to Firestore!");
                            
                          //save the firstName value so it can be used throughout the app. 
                          AsyncStorage.setItem('userFirstName', capitalizedFirstName)
                          .catch(error => console.log('Error saving firstName:', error));

                          //makes sure profileSetupComplete is true because this is how you navigate to home screen (bottomTab)
                          if (setProfileSetupComplete) {
                            AsyncStorage.setItem('profileSetupComplete', 'true');
                            setProfileSetupComplete(true);
                          } else {
                            console.log("ERROR: setProfileSetupComplete is undefined");
                          }
                            
                          })
                        } else {
                          // Don't think this can happen anymore but just incase a user goes straight to signUpScreen1 without signing up first there will be an error 
                          console.error("No authenticated user found");
                          alert("Please sign in before completing your profile");
                        }
                        // If all the required forms are not filled out there will be an error 
                      } else {
                        alert("Please complete all required fields"); 
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>Finish Signup</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>                   
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    marginTop: -50
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 15, // Balances the negative margin from container
    width: '100%',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal:'10%'
    //justifyContent: 'space-around',
    //paddingTop:20
  },
  containerSafe: {
    
    //this is how far from the top of the screen everything is
    marginTop:'5%',
    
  },
  buttonContainerSocial: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:20,
    marginTop:25,
    borderRadius:8
},
buttonContainerLogin: {
    marginTop:30,
},
inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width:'100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 20,
    gap:10
},
inputContainerSelected: {
  flexDirection: 'row',
  alignItems: 'center',
  height: 50,
  width:'100%',
  backgroundColor: '#f1f1f1',
  borderRadius: 8,
  borderWidth:1,
  borderColor:"#979797",
  paddingLeft: 16,
  marginBottom: 20,
  gap:10
},
inputContainerBig: {
gap:5
},
input:{
    flex:1,
    height:'100%',
    width:'100%',
    fontSize:16,
},
buttonLayout: {
    flexDirection:'row',
},
buttonLogin:{
    paddingVertical:16,
    backgroundColor:"#FEC34E",
    borderRadius: 6,
    paddingHorizontal:100,
    marginBottom:16,
  },
  buttonSocial:{
    paddingVertical:9,
    backgroundColor:"#E4E4E4",
    borderRadius: 8,
    paddingHorizontal:18,
    marginBottom:0,
    
  },
  buttonText:{
    display:'flex',
    fontWeight:'600',
    fontSize: 16,
    alignSelf:'center',
    //paddingLeft:10,
    flexDirection:'row'
    
  },
  buttonTextSign:{
    fontWeight:'600',
    fontSize: 16,
    alignSelf:'center',
    color:'white'
  },
  profilePictureLabel: {
    marginTop:10,
    textAlign:'center',
    fontWeight:'500',
    fontSize:20,
  },
  mainTextContainer:{
    marginBottom:40,
  },
  mainText:{
    textAlign: "center",
    fontSize: 34,
    fontWeight: "500",
  },
  profileImage:{
    width:60,
    height:60,
  },
  selectedAvatar: {
    backgroundColor: "#FFD885",
  },
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 1,
  },
    
  inputSuccess: {
    //borderColor: '#4CAF50',
    //borderWidth: .5,
  },
    
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginBottom: 8,
    marginTop: -15,
    marginLeft: 5,
  },
  errorTextAvatar: {
    color: '#FF6B6B',
    fontSize: 12,
    marginBottom: -18,
    marginTop: 10,
    marginLeft: 5,
  },
    
  validIcon: {
    marginRight: 10,
  },
});
