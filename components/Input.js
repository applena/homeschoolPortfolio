import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
  <View>
    <Text>{props.label}</Text>
    <TextInput
      style={styles.input}
      onChangeText={props.setItem}
      value={props.item}
    />
  </View>
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: .5,
    padding: 10
  },
})

export default Input;