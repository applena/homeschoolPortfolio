import React from 'react';
import CalendarOutline from './CalendarOutline';
import { Text, View } from 'react-native';

function Calendar(props) {
  return (
    <View id="caldenar">
      <Text>Calendar</Text>
      <CalendarOutline />
    </View>
  )
}

export default Calendar