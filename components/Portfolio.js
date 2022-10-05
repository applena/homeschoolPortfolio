import React, { useState } from 'react';
import { Text, StyleSheet, View, Button, ScrollView } from 'react-native';
import DropdownCategory from './DropdownCategory';

function Portfolio() {

  return (
    <View style={{ width: 500 }}>
      <Text style={styles.title}>Portfolio</Text>
      <ScrollView style={styles.container}>
        <DropdownCategory
          category='Reading Log'
        />
        <DropdownCategory
          category='Writing'
        />
      </ScrollView>
      <Button
        title="Add Item"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    borderLeftColor: 'gray',
    borderLeftWidth: 0.5,
    borderRightColor: 'gray',
    borderRightWidth: 0.5,
    padding: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default Portfolio;