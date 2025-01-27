import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Feed() {
  console.log("Feed Rendered")
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>FEED SCREEN TEST</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
