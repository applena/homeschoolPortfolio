import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function PortfolioItem(props) {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.textStyleHeader}>{props.item.Name}</Text>
      <Text style={styles.textStyle}>Description: {props.item.description}</Text>
      <Text style={styles.textStyle}>Link: {props.item.link}</Text>
      <Text style={styles.textStyle}>{props.item.img}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 10
  },
  textStyle: {
    color: 'black',
    padding: 5,
  },
  textStyleHeader: {
    fontSize: 20,
    padding: 5,
    textAlign: 'center'
  }
})

export default PortfolioItem;