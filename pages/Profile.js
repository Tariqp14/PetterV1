import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  console.log("Profile Rendered")
  return (
    <View style={styles.container}>
      <Text style={{color: 'gold'}}>Profile screen</Text>
      
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
