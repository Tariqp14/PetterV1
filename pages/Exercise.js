import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Exercise() {
  console.log("Exercise Rendered")
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>EXERCISE SCREEN TEST</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
