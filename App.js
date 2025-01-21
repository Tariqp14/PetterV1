import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Feed from './pages/Feed';
//currently trying to keep main app.js clear to avoid too much confusion -T
import HomeScreen from './pages/Home';
import BottomTab from './BottomTab';

export default function App() {
  return (
    <>
      <BottomTab />
    </>
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

//asked chatgpt why text wasnt loading initially, solved on my own by getting rid of view component was causing it -T
// Had component conflict, gave ChatGPT the code, solved it on my own by removing the Home component from the App -T