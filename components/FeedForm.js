import { View, TextInput, Text, Button, StyleSheet, ScrollView, KeyboardAvoidingView, } from "react-native";
import React from "react";
import { Formik } from "formik";
import { getDate } from "../timelineEvents";
import { Picker } from '@react-native-picker/picker';
export function FeedForm({ onSubmit }) {

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Formik
            initialValues={{ first: getDate(), second: getDate(), third: getDate(), pet: '', foodBrand: '', foodType: '', notes: '' }}
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
                      selectedValue={[formikProps.pet]}
                      style={styles.picker}
                      onValueChange={(itemValue) =>
                        formikProps.setFieldValue('pet', itemValue)
                      }>
                      <Picker.Item label="Cat" value="Cat" />
                      <Picker.Item label="Dog" value="Dog" />
                    </Picker>
                  </View>
                </View>

                <ScrollView horizontal={true} contentContainerStyle={styles.times} showsHorizontalScrollIndicator={false}>
                  <View>
                    <Text style={styles.label}>First Feed Time</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="First Feed Time"
                      onChangeText={formikProps.handleChange('first')}
                      value={formikProps.values.first}
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>Second Feed Time</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Second Feed Time"
                      onChangeText={formikProps.handleChange('second')}
                      value={formikProps.values.second}
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>Third Feed Time</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Third Feed Time"
                      onChangeText={formikProps.handleChange('third')}
                      value={formikProps.values.third}
                    />
                  </View>

                </ScrollView>
                <View>
                  <Text style={styles.label}>Food Brand</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Food Brand"
                    onChangeText={formikProps.handleChange('foodBrand')}
                    value={formikProps.values.color}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Food Type</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Food Type"
                    onChangeText={formikProps.handleChange('foodType')}
                    value={formikProps.values.summary}
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