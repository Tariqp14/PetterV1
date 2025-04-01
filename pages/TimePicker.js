import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';

export const TimePicker = ({ value, onChangeValue }) => {

  const onChange = (event) => {
    console.log(onChangeValue)
  };

  return (
    <SafeAreaView>
      <DateTimePicker
        testID="dateTimePicker"
        value={value}
        mode={"time"}
        is24Hour={true}
        onChange={onChange}
        accentColor="transparent"
        style={{ backgroundColor: "transparent" }}
      />
    </SafeAreaView>
  );
};




