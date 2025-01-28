import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import BottomTab from './BottomTab';

//currently trying to keep main app.js clear to avoid too much confusion -T
// video for navbar creation https://www.youtube.com/watch?v=AnjyzruZ36E
//https://reactnavigation.org/docs/bottom-tab-navigator

export default function App() {
  return (
    <BottomTab/>
    // Just commenting this out so I can test the navigation
    /* <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View> */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
