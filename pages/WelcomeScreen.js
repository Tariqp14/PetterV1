import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

export default function WelcomeScreen() {
const navigation = useNavigation();
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.logo}>
            <Image source={require('../images/petterLogo.png')}/>
        </View>
        <View style = {styles.logo}>
            <Text style = {styles.mainText}> Petter </Text>
                <View style = {styles.subTextContainer}>
                    <Text style = {styles.subText}> The </Text>
                    <Text style = {styles.subTextGold}>  better  </Text>
                    <Text style = {styles.subText}> place for your pet </Text>
                </View>
        </View>
        <View style = {styles.mainImage}>
            <Image source={require('../images/circlePets1.png')} />
        </View>
        <View style = {styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonLog} onPress={() => navigation.navigate(LoginScreen)}>
            <Text style={styles.buttonTextLog}> Login </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSign} onPress={() => navigation.navigate(SignUpScreen)}>
            <Text style={styles.buttonTextSign}> Sign Up </Text>
            </TouchableOpacity>
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
  },
  logo: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  mainImage: {
   marginTop: '3%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    marginVertical:"9%",
  },
  mainText:{
    textAlign: "center",
    fontSize: 64,
    fontWeight: "600",
  },
  subTextContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  subText:{
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
    marginHorizontal:0,
    //padding:0,
  },
  subTextGold:{
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color:"#FEC34E",
    marginTop:0,
    marginHorizontal:-5,
    //padding
  },
  buttonLog:{
    paddingVertical:16,
    backgroundColor:"#FEC34E",
    borderRadius: 6,
    paddingHorizontal:130,
    marginBottom:16,
  },
  buttonSign:{
    paddingVertical:16,
    backgroundColor:"#242424",
    borderRadius: 6,
    paddingHorizontal:130,
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

});
