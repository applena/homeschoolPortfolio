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

      {/* <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          '2023-09-22': [{ name: 'item 1 - any js object' }],
          // '2012-05-23': [{ name: 'item 2 - any js object', height: 80 }],
          // '2012-05-24': [],
          // '2012-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
        }}
      /> */}
    </View>
  )
}

export default CalendarContainer;