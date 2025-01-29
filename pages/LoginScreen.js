import { Image, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView,ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {AntDesign} from '@expo/vector-icons/';
import {Octicons} from '@expo/vector-icons/';

export default function LoginScreen() {
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.logo}>   
            <Text style = {styles.mainText}> Login </Text>
        </View>
        <View style = {styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonSocial} onPress={() => navigation.navigate()}>
            <View style = {styles.buttonLayout} >
                <AntDesign name="google" size={19} color= 'black' style={styles.icon} />
                <Text style={styles.buttonTextLog}> Google </Text>
            </View>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.buttonSocial} onPress={() => navigation.navigate()}>
            <View style = {styles.buttonLayout} >
                <AntDesign name="apple1" size={19} color= 'black' style={styles.icon} />
                <Text style={styles.buttonTextLog}> Apple </Text>
            </View>
            </TouchableOpacity>        
        </View>         
                
        <KeyboardAvoidingView 
            //behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={50}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
                <View style = {styles.container}>
                    <Formik 
                        initialValues={{ username:'', password:''}}
                        onSubmit={(values) => {
                            onSubmit(values);
                        }}>
                            {({handleChange,handleBlur,handleSubmit,values,errors,isValid,touched}) =>(
                                <View>
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
                            
                                    <Text style = {styles.label}>Password</Text>
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
                                    <View style = {styles.buttonContainer1}>
                                        <TouchableOpacity style={styles.buttonLog}
                                        disabled={!isValid} onPress={() => navigation.navigate()}>
                                        <Text style={styles.buttonTextLog}> Login </Text>
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
    justifyContent: 'space-evenly',
    paddingTop:20
  },
  buttonContainer: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:12,
},
buttonContainer1: {
    marginVertical:"9%",
},
inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:200,
    //width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
},
buttonLayout: {
    flexDirection:'row',
},
buttonLog:{
    paddingVertical:16,
    backgroundColor:"#FEC34E",
    borderRadius: 6,
    paddingHorizontal:130,
    marginBottom:16,
  },
  buttonSocial:{
    paddingVertical:9,
    backgroundColor:"grey",
    borderRadius: 6,
    paddingHorizontal:18,
    marginBottom:0,
  },
  buttonTextLog:{
    fontWeight:'600',
    fontSize: 16,
    alignSelf:'center'
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
    justifyContent: 'space-around',
    marginTop: 0,
  },
  mainText:{
    textAlign: "center",
    fontSize: 34,
    fontWeight: "500",
  },
});
