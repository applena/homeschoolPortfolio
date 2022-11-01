import React, { useState } from 'react';
import Input from './Input';
import { Text, StyleSheet, View, Button } from 'react-native';

function NewUser(props) {
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState(0);

  const newStudent = (obj) => {
    obj.label === 'name' ? setNewName(obj.value) : setNewGrade(obj.value);
  }

  const submitNewStudent = () => {
    console.log('submitNewStudent', { newName, newGrade })
    props.setStudent({ label: 'name', value: newName });
    props.setStudent({ label: 'grade', value: newGrade });
    props.displayPage();

  }

  return (
    <View>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.textStyle}>To get started we just need a bit of information</Text>

      <Input
        label="Student's name"
        item={newName}
        setItem={(value) => newStudent({ label: 'name', value })}
      />

      <Input
        label="Student's grade"
        item={newGrade}
        setItem={(value) => newStudent({ label: 'grade', value })}
      />
      <Button
        onPress={submitNewStudent}
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