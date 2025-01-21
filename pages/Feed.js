import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Feed() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Feeding Schedule</Text>
        <View style={styles.sub}>
          <Text style={styles.subheading}>Coco</Text>
          <Text style={styles.subheading}>Mr Whiskers</Text>
          <Text></Text>
        </View>
        <Text style={styles.subheading}>Add New Feed Time</Text>

      </View>
      <View style={styles.section}>


      </View>
      <View style={styles.section}>


      </View>
      <View style={styles.section}>


      </View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  section: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    justifyContent: "space-evenly"

  },

  title: {
    fontSize: 26,
    fontWeight: 500,

  },

  subheading: {
    fontSize: 20,
    fontWeight: 500,

  },
  sub: {
    flexDirection: "row",
    justifyContent: "space-between"
  }

});

