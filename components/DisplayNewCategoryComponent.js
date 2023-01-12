import React from 'react';
import { Modal, View, TextInput, StyleSheet, Text, Pressable } from 'react-native';

function DisplayNewCategoryComponent(props) {
  // console.log('display new category component', props)
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
            <TextInput
              label="Name Of Category"
              onChangeText={(value) => props.addCategory(value)}
              styles={styles.modalText}
            />
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
  },
})

export default DisplayNewCategoryComponent;