import React, { useState } from 'react';
import { Text, StyleSheet, View, Button, ScrollView } from 'react-native';
import DropdownCategory from './DropdownCategory';

function Portfolio() {

  return (
    <View style={{ width: 500, marginTop: 10 }}>
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
    padding: 20,
    borderColor: 'gray',
    borderWidth: 0.5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20
  }
});

export default Portfolio;