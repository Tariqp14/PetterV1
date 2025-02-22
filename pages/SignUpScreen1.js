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

export default function SignUpScreen1() {
  
  const navigation = useNavigation();

  return (
    <SafeAreaView style = {styles.container}>
        {/* Needed a second one? For some reason this is the only way to make the safe area view work for me on this screen. Will look at again later. */}
        <SafeAreaView style = {styles.containerSafe}> 
        <Text style = {styles.mainText}> Let's get</Text>
        <Text style = {styles.mainText}> some more </Text>
        <Text style = {styles.mainText}> info! </Text>
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
                        initialValues={{ firstName:'', lastName:'',age:'',type:''}}
                        onSubmit={(values) => {
                            onSubmit(values);
                        }}>
                          {/* still need to implement showing errors and validation */}
                            {({handleChange,handleBlur,handleSubmit,values,errors,isValid,touched}) =>(
                                <View style={styles.inputContainerBig}>
                                    {/* <Text style = {styles.label}>firstName</Text> */}
                                    <View style={styles.inputContainer}>
                                        <Octicons name="person" size={19} color="grey" style={styles.icon} />
                                        <TextInput 
                                          style={styles.input}
                                          placeholder="First Name"
                                          onChangeText={handleChange('First Name')}
                                          onBlur={handleBlur('First Name')}
                                          value={values.firstName}
                                        />
                                    </View>

                                    {/* <Text style = {styles.label}>Username</Text> */}
                                    <View style={styles.inputContainer}>
                                        <Octicons name="person" size={19} color="grey" style={styles.icon} />
                                        <TextInput 
                                          style={styles.input}
                                          placeholder="Last Name"
                                          onChangeText={handleChange('Last Name')}
                                          onBlur={handleBlur('Last Name')}
                                          value={values.lastName}
                                        />
                                    </View>
                                    

                                    {/* <Text style = {styles.label}>Email</Text> */}
                                    <View style={styles.inputContainer}>
                                        <MaterialCommunityIcons name="paw" size={19} color="grey" style={styles.icon} />
                                        <TextInput 
                                          style={styles.input}
                                          placeholder="Pet Type"
                                          onChangeText={handleChange('type')}
                                          onBlur={handleBlur('type')}
                                          value={values.type}
                                        />
                                    </View>
                            
                                    {/* <Text style = {styles.label}>Password</Text> */}
                                    <View style={styles.inputContainer}>
                                        <Octicons name="number" size={19} color= 'grey' style={styles.icon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Pet age"
                                            keyboardType='numeric'
                                            onChangeText={handleChange('age')}
                                            onBlur={handleBlur('age')}
                                            value={values.age}
                                        />  
                                    </View>

                                    <Text style = {styles.label}>Choose Your Avatar</Text>
                                    
                                    <View style = {styles.buttonContainerSocial}>
                                     
                                      <TouchableOpacity style={styles.buttonSocial} onPress={() => navigation.reset({
                                      index: 0, //this makes it so you cant just go back to the login page. you have to log out.this is a placeholder until we get to google and apple login
                                      routes: [{ name: 'BottomTabs' }],
                                  })}>
                                       <View style = {styles.buttonLayout} >
                                          <MaterialCommunityIcons name="face-woman-profile" size={40} color= 'black' style={styles.icon} />
                                          
                                      </View>
                                      </TouchableOpacity>  
                                      <TouchableOpacity style={styles.buttonSocial} onPress={() => navigation.reset({
                                      index: 0, //this makes it so you cant just go back to the login page. you have to log out.this is a placeholder until we get to google and apple login
                                      routes: [{ name: 'BottomTabs' }],
                                  })}>
                                      <View style = {styles.buttonLayout} >
                                          <MaterialCommunityIcons name="face-man-profile" size={40} color= 'black' style={styles.icon} />
                                          
                                      </View>
                                      </TouchableOpacity>        
                                  </View>      
                                    <View style = {styles.buttonContainerLogin}>
                                        <TouchableOpacity style={styles.buttonLogin}
                                        /* this will be for errors and validation. Disables the button if form is not valid */
                                        /* disabled={!isValid} */ onPress={() => navigation.reset({
                                            index: 0, //this makes it so you cant just go back to the login page. you have to log out.
                                            routes: [{ name: 'BottomTabs' }],
                                        })}>
                                        <Text style={styles.buttonText}> Finish Signup </Text>
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
    marginTop:25
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
  label: {
    marginTop:10,
    textAlign:'center',
    fontWeight:'400',
    fontSize:20,
  },
  mainText:{
    textAlign: "center",
    fontSize: 34,
    fontWeight: "500",
  },
});
