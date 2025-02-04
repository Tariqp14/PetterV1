import { Image, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView,ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {AntDesign} from '@expo/vector-icons/';
import {Octicons} from '@expo/vector-icons/';
import {Fontisto} from '@expo/vector-icons/';
import * as yup from 'yup';



// used ai to create regEx. Validation not implemented yet
const passwordRules = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/

const loginValidationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .min(6)
      .matches(passwordRules, {message: "Create a stronger password"})
      .required('Password is required'),
  });

export default function SignUpScreen() {
  
  const navigation = useNavigation();

  return (
    <SafeAreaView style = {styles.container}>
        {/* Needed a second one? For some reason this is the only way to make the safe area view work for me on this screen. Will look at again later. */}
        <SafeAreaView style = {styles.containerSafe}> 
        <Text style = {styles.mainText}> Create an </Text>
        <Text style = {styles.mainText}> Account </Text>
        {/* view for google and apple buttons */}
        <View style = {styles.buttonContainerSocial}>
            <TouchableOpacity style={styles.buttonSocial} onPress={() => navigation.reset({
             index: 0, //this makes it so you cant just go back to the login page. you have to log out.this is a placeholder until we get to google and apple login
             routes: [{ name: 'BottomTabs' }],
         })}>
            <View style = {styles.buttonLayout}>
                {/* cant get the google icon with colors. Will probably have to just download it. */}
                <AntDesign name="google" size={20} color= 'black' style={styles.icon} />
                <Text style={styles.buttonText}> Google </Text>
            </View>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.buttonSocial} onPress={() => navigation.reset({
             index: 0, //this makes it so you cant just go back to the login page. you have to log out.this is a placeholder until we get to google and apple login
             routes: [{ name: 'BottomTabs' }],
         })}>
            <View style = {styles.buttonLayout} >
                <AntDesign name="apple1" size={20} color= 'black' style={styles.icon} />
                <Text style={styles.buttonText}> Apple </Text>
            </View>
            </TouchableOpacity>        
        </View>         
        </SafeAreaView>
        
        
            <KeyboardAvoidingView 
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={50}>
              {/* need to reassess how the scroll view works/its placement. It doesn't work like you would expect. But, it works for now so i'll leave it */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
                <View style = {styles.containerForm}>
                    <Formik 
                        validationSchema={loginValidationSchema}
                        initialValues={{ username:'', password:'',email:''}}
                        onSubmit={(values) => {
                            onSubmit(values);
                        }}>
                          {/* still need to implement showing errors and validation */}
                            {({handleChange,handleBlur,handleSubmit,values,errors,isValid,touched}) =>(
                                <View style={styles.inputContainerBig}>
                                    {/* <Text style = {styles.label}>Username</Text> */}
                                    <View style={styles.inputContainer}>
                                        <Octicons name="person" size={19} color="grey" style={styles.icon} />
                                        <TextInput 
                                          style={styles.input}
                                          placeholder="Username"
                                          onChangeText={handleChange('username')}
                                          onBlur={handleBlur('username')}
                                          value={values.username}
                                        />
                                    </View>

                                    {/* <Text style = {styles.label}>Email</Text> */}
                                    <View style={styles.inputContainer}>
                                        <Fontisto name="email" size={19} color="grey" style={styles.icon} />
                                        <TextInput 
                                          style={styles.input}
                                          placeholder="Email"
                                          keyboardType='email-address'
                                          onChangeText={handleChange('email')}
                                          onBlur={handleBlur('email')}
                                          value={values.email}
                                        />
                                    </View>
                            
                                    {/* <Text style = {styles.label}>Password</Text> */}
                                    <View style={styles.inputContainer}>
                                        <AntDesign name="lock" size={19} color= 'grey' style={styles.icon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            secureTextEntry
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                        />  
                                    </View>
                                    <View style = {styles.buttonContainerLogin}>
                                        <TouchableOpacity style={styles.buttonLogin}
                                        /* this will be for errors and validation. Disables the button if form is not valid */
                                        /* disabled={!isValid} */ onPress={() => navigation.reset({
                                            index: 0, //this makes it so you cant just go back to the login page. you have to log out.
                                            routes: [{ name: 'BottomTabs' }],
                                        })}>
                                        <Text style={styles.buttonText}> Login </Text>
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
    //justifyContent: 'space-around',
    //paddingTop:20
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 35,
    //justifyContent: 'space-around',
    //paddingTop:20
  },
  containerSafe: {
    
    //this is how far from the top of the screen everything is
    marginTop:'20%',
    
  },
  buttonContainerSocial: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:20,
    marginTop:45
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
});
