import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';

export const TimePicker = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <SafeAreaView>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"time"}
        is24Hour={true}
        onChange={onChange}
        accentColor="transparent"
        style={{ backgroundColor: "transparent" }}
      />
    </SafeAreaView>
  );
};




