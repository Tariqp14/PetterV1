import { View, TextInput, Text, Button, StyleSheet, ScrollView, KeyboardAvoidingView, } from "react-native";
import React from "react";
import { Formik } from "formik";
import { getDate } from "../timelineEvents";
import { Picker } from '@react-native-picker/picker';
import { TimePicker } from "../pages/TimePicker";
import DateTimePicker from '@react-native-community/datetimepicker';
export function FeedForm({ onSubmit, pets }) {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Formik
            initialValues={{ first: new Date(), second: new Date(), third: new Date(), pet: pets[0]?.Name, foodBrand: '', foodType: '', notes: '' }}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {(formikProps) => (
              <View>
                <View>
                  <Text style={styles.label}>Select Pet</Text>
                  <View tyle={styles.pickerContainer}>
                    <Picker
                      selectedValue={formikProps.values.pet}
                      style={styles.picker}
                      onValueChange={(itemValue) =>
                        formikProps.setFieldValue('pet', itemValue)
                      }>
                      {pets.map((pet) => {
                        return <Picker.Item key={pet.Name} label={pet.Name} value={pet.Name} />
                      })}
                    </Picker>
                  </View>
                </View>

                <ScrollView horizontal={true} contentContainerStyle={styles.times} showsHorizontalScrollIndicator={false}>
                  <View>
                    <Text style={styles.label}> Feed Time 1</Text>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={formikProps.values.first}
                      mode={"time"}
                      is24Hour={true}
                      onChange={(event, selectedDate) => formikProps.setFieldValue('first', selectedDate)}
                      accentColor="transparent"
                      style={{ backgroundColor: "transparent" }}
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>Feed Time 2</Text>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={formikProps.values.second}
                      mode={"time"}
                      is24Hour={true}
                      onChange={(event, selectedDate) => formikProps.setFieldValue('second', selectedDate)}
                      accentColor="transparent"
                      style={{ backgroundColor: "transparent" }}
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>Feed Time 3</Text>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={formikProps.values.third}
                      mode={"time"}
                      is24Hour={true}
                      onChange={(event, selectedDate) => formikProps.setFieldValue('third', selectedDate)}
                      accentColor="transparent"
                      style={{ backgroundColor: "transparent" }}
                    />
                  </View>

                </ScrollView>
                <View>
                  <Text style={styles.label}>Food Brand</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Food Brand"
                    onChangeText={formikProps.handleChange('foodBrand')}
                    value={formikProps.values.foodBrand}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Food Type</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Food Type"
                    onChangeText={formikProps.handleChange('foodType')}
                    value={formikProps.values.foodType}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Notes</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Notes"
                    onChangeText={formikProps.handleChange('notes')}
                    value={formikProps.values.summary}
                  />
                </View>


                <View style={styles.button}>
                  <Button title="Submit" color="black" onPress={formikProps.handleSubmit} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex:1,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 5,
    marginTop: 35,
    backgroundColor: "#E8E8E8"
  },
  form: {
    backgroundColor: "#E8E8E8",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
    marginHorizontal: 10,
    marginTop: 10
  },
  input: {
    height: 60,
    marginBottom: 15,
    shadowColor: '#151515',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 0,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  button: {
    margin: 40,
    shadowColor: '#151515',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: .2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 0,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  pickerContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden", // Enforces the borderRadius

  },
  picker: {
    height: "20%",
  },

  times: {
    gap: 10,
    marginTop: 10,
  },
});