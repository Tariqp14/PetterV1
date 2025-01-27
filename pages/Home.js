import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  console.log("Home Rendered")
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>HOME SCREEN TEST</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
