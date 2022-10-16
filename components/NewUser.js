import React, { useEffect } from 'react';
import Input from './Input';
import { Text, StyleSheet, View, Button } from 'react-native';
import Storage from './Storage';

function NewUser(props) {

  useEffect(() => {
    Storage.save({
      key: 'portfolio',
      data: [
        { label: 'Reading Log', data: [] },
        { label: 'Writing', data: [] },
        { label: 'Add Item', value: 0, category: 'Other' }
      ]
    })
  })

  return (
    <View>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.textStyle}>To get started we just need a bit of information</Text>

      <Input
        label="Student's name"
        item={props.studentName}
        setItem={(value) => props.setStudent({ label: 'name', value })}
      />

      <Input
        label="Student's grade"
        item={props.studentGrade}
        setItem={(value) => props.setStudent({ label: 'grade', value })}
      />
      <Button
        onPress={props.displayPage}
        title="Submit"
        color="#841584"
        accessibilityLabel="Submit a New Student"
      />
      <Text style={styles.subtext}>All of your information is kept completely private and only stored on your phone</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  subtext: {
    fontSize: 9,
    marginTop: 40
  }
})

export default NewUser