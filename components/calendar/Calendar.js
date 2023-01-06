import React from 'react';
import CalendarOutline from './CalendarOutline';
import { Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

function CalendarContainer(props) {
  return (
    <View id="caldenar">
      <Calendar
        onDayPress={day => {
          console.log('selected day', day);
        }}
        onMonthChange={month => {
          console.log('month changed', month);
        }}
      />
    </View>
  )
}

export default CalendarContainer;