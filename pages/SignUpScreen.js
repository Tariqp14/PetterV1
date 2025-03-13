import { Image, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView,ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {AntDesign} from '@expo/vector-icons/';
import {Octicons} from '@expo/vector-icons/';
import {Fontisto} from '@expo/vector-icons/';
import * as yup from 'yup';
import SignUpScreen1 from './SignUpScreen1';
import React from 'react';
import { useState } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getFirebaseErrorMessage } from '../components/authCode';
import AsyncStorage from '@react-native-async-storage/async-storage';


// used ai to create regEx. Validation not implemented yet
//const passwordRules = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/
const uppercaseRegEx = /^(?=.*[A-Z])/;
const numberRegEx = /^(?=.*\d)/;
const specialCharRegEx = /^(?=.*[@$!%*?&])/;
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginValidationSchema = yup.object().shape({
    username: yup
      .string(),
      //.required('Username is required'),
    email: yup
      .string()
      //.email('Please enter valid email')
      .matches(emailRegEx, 'Please enter a valid email ie. your@email.com')
      .required('Email is required'),
    password: yup
      .string()
      .min(6)
      .matches(uppercaseRegEx, 'Password must have at least one uppercase letter')
      .matches(numberRegEx, 'Password must have at least one number')
      .matches(specialCharRegEx, 'Password must have at least one special character')
      .required('Password is required'),
  });

export default function SignUpScreen() {
  
  const navigation = useNavigation();
  const [focusedField, setFocusedField] = useState(null);
  const [authError, setAuthError] = useState(null); // for saving and displaying firebase error messages 
  const [isLoading, setIsLoading] = useState(false); // for setting up loading state and helping with logic based on if the screen is loading or not

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}>
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent} 
          showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <Text style={styles.mainText}>Create an</Text>
          <Text style={styles.mainText}>Account</Text>
          
          {/* Social Buttons */}
          <View style={styles.buttonContainerSocial}>
            <TouchableOpacity style={styles.buttonSocial} onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'BottomTabs' }],
            })}>
              <View style={styles.buttonLayout}>
                <View style={styles.imageContainer}>
                  <Image source={require('../images/GoogleLogo.png')} style={styles.socialLogo} />            
                </View>  
                <Text style={styles.buttonText}>Google</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonSocial} onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'BottomTabs' }],
            })}>
              <View style={styles.buttonLayout}>
                <AntDesign name="apple1" size={20} color="black" style={styles.icon} />
                <Text style={styles.buttonText}>Apple</Text>
              </View>
            </TouchableOpacity>
          </View>

                <View style = {styles.containerForm}>
                    <Formik 
                        validationSchema={loginValidationSchema}
                        initialValues={{ username:'', password:'',email:''}}
                        onSubmit={async (values, { setSubmitting }) => {
                          console.log("Form Values",values);
                          try {
                            setIsLoading(true); // sets loading state to true
                            setSubmitting(true); // Disable form during submission
                            // Store values in local state or context before authentication
                            const userCredential = await createUserWithEmailAndPassword(
                              auth, 
                              values.email, 
                              values.password
                            );
                            
                            // This seemed to be preventing the navigation to sign up screen. need to look more into why
                            // Add small delay to ensure auth state is processed
                           /*  setTimeout(() => {
                              navigation.navigate('SignUpScreen1');
                            }, 100); */
                            
                            // set this to false to go to signUpScreen1
                            await AsyncStorage.setItem('profileSetupComplete', 'false');
                            navigation.navigate('SignUpScreen1');
                          } catch (error) {
                            console.error("Sign-Up Error:", error.message);
                            setAuthError(getFirebaseErrorMessage(error.code || error.message));
                          } finally {
                            setSubmitting(false);
                            setIsLoading(false); // Reset loading state
                          }
                        }}>
                          {/* implemented showing errors and validation */}
                            {({handleChange,handleBlur,handleSubmit,values,errors,isValid,touched,setTouched}) =>(
                                <View style={styles.inputContainerBig}>
                                    {/* -------- Username -------- */}
                                    {/* <View style={[
                                      styles.inputContainer,
                                      focusedField === 'username' ? styles.inputContainerSelected : null, // this to highlight your selected field. 
                                      //these will show different field styles based on if errors.username is true. 
                                      touched.username && errors.username ? styles.inputError : 
                                      touched.username && !errors.username ? styles.inputSuccess : null 
                                      ]}>
                                        <Octicons name="person" size={19} color="grey" style={styles.icon} />
                                        <TextInput 
                                          style={styles.input}
                                          placeholder="Username"
                                          onChangeText={handleChange('username')}
                                          onFocus={() => setFocusedField('username')}
                                          onBlur={(e) => {
                                            handleBlur('username')(e);
                                            setFocusedField(null);
                                          }}
                                          value={values.username}
                                        />
                                        {touched.username && !errors.username && (
                                        <AntDesign name="checkcircle" size={16} color="green" style={styles.validIcon} />
                                      )}
                                    </View>
                                    {touched.username && errors.username && (
                                      <Text style={styles.errorText}>{errors.username}</Text>
                                    )}
 */}
                                    {/* -------- Email -------- */}
                                    <View style={[
                                      styles.inputContainer,
                                      focusedField === 'email' ? styles.inputContainerSelected : null,
                                      touched.email && errors.email ? styles.inputError : 
                                      touched.email && !errors.email ? styles.inputSuccess : null 
                                    ]}>
                                        <Fontisto name="email" size={19} color="grey" style={styles.icon} />
                                        <TextInput 
                                          style={styles.input}
                                          placeholder="Email"
                                          keyboardType='email-address'
                                          onChangeText={handleChange('email')}
                                          onFocus={() => setFocusedField('email')}
                                          onBlur={(e) => {
                                            handleBlur('email')(e);
                                            setFocusedField(null);
                                          }}
                                          value={values.email}
                                        />
                                        {touched.email && !errors.email && (
                                          <AntDesign name="checkcircle" size={16} color="green" style={styles.validIcon} />
                                        )}
                                    </View>
                                    {touched.email && errors.email && (
                                      <Text style={styles.errorText}>{errors.email}</Text>
                                    )}
                            
                                    {/* -------- Password -------*/}
                                    <View style={[
                                      styles.inputContainer,
                                      focusedField === 'password' ? styles.inputContainerSelected : null,
                                      touched.password && errors.password ? styles.inputError : 
                                      touched.password && !errors.password ? styles.inputSuccess : null 
                                    ]}>
                                        <AntDesign name="lock" size={19} color= 'grey' style={styles.icon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            secureTextEntry
                                            onChangeText={handleChange('password')}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={(e) => {
                                              handleBlur('password')(e);
                                              setFocusedField(null);
                                            }}
                                            value={values.password}
                                        />
                                        {touched.password && !errors.password && (
                                          <AntDesign name="checkcircle" size={16} color="green" style={styles.validIcon} />
                                        )}  
                                    </View>
                                    {touched.password && errors.password && (
                                      <Text style={styles.errorText}>{errors.password}</Text>
                                    )}
                                    
                                    <View style = {styles.buttonContainerLogin}>
                                        <TouchableOpacity style={[styles.buttonLogin,isLoading ? styles.buttonDisabled : null]} 
                                        onPress={() => {
                                          // Mark all fields as touched to trigger error messages
                                          setTouched({
                                            username: true,
                                            email: true,
                                            password: true
                                          });
                                          
                                          // Only proceed with submit if valid and not loading
                                          if (isValid && !isLoading) {
                                            handleSubmit();
                                          }
                                        }}
                                        disabled={isLoading} // Disables the button when loading is true
                                        //line below changes the text based on if the form is loading or not
                                        >
                                        <Text style={styles.buttonText}> {isLoading ? "Creating Profile..." : "Sign Up"} </Text> 
                                        </TouchableOpacity>
                                       {/*  shows error from firebase below the button if there is one */}
                                        {authError &&(
                                        <View style={styles.loginErrorContainer}>
                                        <Text style={styles.loginErrorText}>{authError}</Text>
                                        </View>)}                        
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
    justifyContent: 'flex-start',
    marginTop:-50
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 50, // opposite as the marginTop. Gets rid of odd white space while keeping items centered. 
    width: '100%',
    
  },

  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //marginTop: 35,
    //justifyContent: 'space-around',
    //paddingTop:20
  },
  
  buttonContainerSocial: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:20,
    marginVertical:45,
},
buttonContainerLogin: {
    marginVertical:"9%",
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
    paddingHorizontal:130,
    marginBottom:16,
    maxWidth:340
  },
  buttonSocial:{
    paddingVertical:9,
    backgroundColor:"#E4E4E4",
    borderRadius: 8,
    paddingHorizontal:18,
    marginBottom:0,
    
  },
  buttonText:{
    fontWeight:'600',
    fontSize: 16,
    alignSelf:'center',
    paddingLeft:10,
    
  },
  buttonTextSign:{
    fontWeight:'600',
    fontSize: 16,
    alignSelf:'center',
    color:'white'
  },
  logo: {
    //flex:1,
    //display: 'flex',
    //justifyContent: 'space-around',
  },
  mainText:{
    textAlign: "center",
    fontSize: 34,
    fontWeight: "500",
  },
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 1,
    //backgroundColor: '#FFEFEF',
  },
  
  inputSuccess: {
    borderColor: '#4CAF50',
    borderWidth: .5,
    //backgroundColor: '#F0FFF0',
  },
  
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginBottom: 8,
    marginTop: -15,
    marginLeft: 5,
  },
  
  validIcon: {
    marginRight: 10,
  },
  
  buttonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
  socialLogo:{
    width: 30, // Larger size
    height: 30,
  },
  imageContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',},
    loginErrorText: {
      color: '#FF6B6B',
      fontSize: 14,
    },
    loginErrorContainer: {
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      padding: 10,
      borderRadius: 6,
      marginBottom: 10,
      width: '100%',
    },
});
