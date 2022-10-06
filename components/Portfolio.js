import React, { useState } from 'react';
import { Text, StyleSheet, View, Button, ScrollView, Pressable } from 'react-native';
import DropdownCategory from './DropdownCategory';
import AddNewItem from './AddNewItem';

function Portfolio() {
  const [displayNewItem, setDisplayNewItem] = useState(false)

  const addItem = (category = 0) => {
    setDisplayNewItem(true);
  }

  return (
    <View style={{ width: 500, marginTop: 10 }}>
      {displayNewItem &&
        <AddNewItem
          displayNewItem={displayNewItem}
          displayModal={(boo) => setDisplayNewItem(boo)}
        />
      }
      <Text style={styles.title}>Portfolio</Text>
      <ScrollView style={styles.container}>
        <DropdownCategory
          category='Reading Log'
          addItem={addItem}
        />
        <DropdownCategory
          category='Writing'
          addItem={addItem}
        />
      </ScrollView>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setDisplayNewItem(true)}
      >
        <Text style={styles.textStyle}>Add New Item</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderColor: 'gray',
    borderWidth: 0.5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default Portfolio;