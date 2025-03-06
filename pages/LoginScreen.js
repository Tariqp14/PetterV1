import { Image, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView,ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {AntDesign} from '@expo/vector-icons/';
import {Octicons} from '@expo/vector-icons/';
import * as yup from 'yup';
import HomeScreen from './Home';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';


// used ai to create regEx
const passwordRules = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/

const loginValidationSchema = yup.object().shape({
    username: yup
      .string(),
      //.required('Username is required'),
    password: yup
      .string()
      .min(6)
      //.matches(passwordRules, {message: "Create a stronger password"})
      .required('Password is required'),
  });

export default function LoginScreen() {

    const navigation = useNavigation();

    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleContainerGreen}>
        <Image source={require("../images/greenCircle.png")} style={styles.greenCircle}/>
      </View>
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: 'center' }}
      keyboardVerticalOffset={50}>
      <ScrollView 
        contentContainerStyle={{ 
          flex: 1, 
          justifyContent: 'center',
          paddingVertical: 20
        }}> 
        {/* Login title */}
        <Text style={styles.mainText}>Login</Text>
        
        {/* Social buttons */}
        <View style={styles.buttonContainerSocial}>
          <TouchableOpacity style={styles.buttonSocial} onPress={() => navigation.reset({
             index: 0,
             routes: [{ name: 'BottomTabs' }],
            })}>
            <View style={styles.buttonLayout}>
            <View style={styles.imageContainer}>
              <Image source={require('../images/GoogleLogo.png')} style={styles.socialLogo} />
            </View>
    
              <Text style={styles.buttonText}> Google </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonSocial} onPress={() => navigation.reset({
             index: 0,
             routes: [{ name: 'BottomTabs' }],
            })}>
            <View style={styles.buttonLayout}>
              <AntDesign name="apple1" size={20} color="black" style={styles.icon} />
              <Text style={styles.buttonText}> Apple </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Form container */}
        <View style={styles.containerForm}>
          <Formik 
            validationSchema={loginValidationSchema}
            initialValues={{ username:'', password:''}}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("Form Values",values);
                  try {
                      await signInWithEmailAndPassword(auth, values.email, values.password);
                      //navigation.navigate('HomeScreen');
                      } catch (error) {
                          console.error("Login Error:", error.message);
                      } finally {
                          setSubmitting(false);
                      }
          }}>
            {({handleChange, handleBlur, handleSubmit, values, errors, isValid, touched}) => (
              <View style={styles.inputContainerBig}>
                <View style={styles.inputContainer}>
                  <Octicons name="person" size={19} color="grey" style={styles.icon} />
                  <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>
        
                <View style={styles.inputContainer}>
                  <AntDesign name="lock" size={19} color="grey" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />  
                </View>
                <View style={styles.buttonContainerLogin}>
                  <TouchableOpacity 
                    style={styles.buttonLogin}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}> Login </Text>
                  </TouchableOpacity>
                </View>   
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <View style={styles.circleContainerYellow}>
        <Image source={require("../images/yellowCircle.png")} style={styles.yellowCircle}/>
      </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -130 // This is the opposite of the custom header hight to center the content properly. 
    //paddingTop:20
  },
  containerForm: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //marginTop: 35,
    justifyContent: 'center',
    //paddingTop:20
    width: '100%'

  },
  containerSafe: {
    //this is how far from the top of the screen everything is
    //marginTop:'30%',
    
  },
  buttonContainerSocial: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:20,
    marginTop:45,
    marginBottom:45
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
  socialLogo:{
    width: 30, // Larger size
    height: 30,
  },
  imageContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleContainerGreen: {
    position: 'absolute',
    right:-20,
    top:150,
    zIndex: 10
  },
    greenCircle:{
      width: 80,  // Add appropriate dimensions
      height: 80
    },
    circleContainerYellow: {
      position: 'absolute',
      left:-20,
      bottom:70,
      //zIndex: -1 // puts circle in the back but need to figure out how to make form background transparent first
    },
    yellowCircle:{
      width: 130,  
      height:130
    },
});
