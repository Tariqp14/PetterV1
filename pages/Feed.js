import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';





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

        <View style={styles.newfeedtime}>
          <AntDesign style={styles.iconplus} name="plus" size={24} color="black" />
          <Text style={styles.subheading}>Add New Feed Time</Text>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.editFood}>
          <Text style={styles.subheading}>Food Info</Text>
          <Text style={styles.edit}>Edit</Text>
        </View>
        <View style={styles.petfoodbox}>
          <Text>Blue Buffalo</Text>
          <Text style={styles.lighttext}>Life Protection Formula</Text>
        </View>

        <View style={styles.petmealboxes}>
          <View style={styles.petfoodbox}>
            <Text>2 Cups</Text>
          </View>

          <View style={styles.petfoodbox}>
            <Text>2 Meals per Day</Text>
          </View>
        </View>

      </View>

      <View style={styles.section}>
        <Text>Buy More</Text>
        <View style={styles.petfoodbox}>

          <Text style={styles.lighttext}>Life Protection Formula</Text>
        </View>
      </View>
    </SafeAreaView >
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
    justifyContent: "space-evenly",
    gap: 20,

  },

  title: {
    fontSize: 26,
    fontWeight: 500,
    fontFamily: "Inter"

  },

  subheading: {
    fontSize: 18,
    fontWeight: 500,

  },
  sub: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  newfeedtime: {
    flexDirection: "row",
  },

  iconplus: {
    marginRight: 5,
  },

  editFood: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  edit: {
    fontSize: 12,
  },

  petfoodbox: {
    backgroundColor: "#FCFDFE",
    shadowColor: "black",
    shadowOpacity: .3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    borderRadius: 6,
    padding: 20,


  },

  lighttext: {
    fontFamily: "Inter",
    fontWeight: 300,


  },

  petmealboxes: {
    flexDirection: "row",
    gap: 20,

  }

});

