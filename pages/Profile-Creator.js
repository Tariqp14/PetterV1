import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';

export default function ProfileCreator() {
    return (
        <View style={styles.container}>
            <View style={styles.infobox}>
                <Text style={styles.title}>
                    Change Name
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="useless placeholder"
                    keyboardType="numeric"
                />
            </View>
        </View>
    );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    regular: {
        fontSize: 12,
      },
    title: {
        fontSize: 26,
        textAlign:"center",
        flex: 1,
    },
    infobox: {

    }
  });