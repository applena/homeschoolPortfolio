import React, { useState } from 'react';
import { Modal, View, StyleSheet, Text, Pressable } from 'react-native';
import Input from './Input';

function DisplayNewCategoryComponent(props) {
  // console.log('display new category component', props)
  const [category, setCategory] = useState('')
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.displayNewCategory}
        onRequestClose={() => {
          props.displayModal(!props.displayNewCategory);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input
              label="Name Of Category"
              // item='test'
              setItem={(value) => setCategory(value)}
              styles={styles.modalText}
            />
            <Pressable
              style={[styles.button, styles.submitButton]}
              onPress={() => props.addCategory(category)}
            >
              <Text style={{ color: 'white' }}>Add Category</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.displayModal(!props.displayNewCategory)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'green',
    borderWidth: 0.5,
    zIndex: 100,
    backgroundColor: 'gray',
    flex: 1
  },
  submitButton: {
    backgroundColor: 'green'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: .5
  },
})

export default DisplayNewCategoryComponent;