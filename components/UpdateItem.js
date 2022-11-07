import React from 'react';
import { Text, View, Modal, Pressable, StyleSheet } from 'react-native';

function UpdateItem(props) {

  console.log('update item', { props })
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={props.displayUpdateItem}
        onRequestClose={() => {
          props.displayModal(!props.displayUpdateItem);
        }}
      >
        <View>
          <Text>Update Item</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => props.displayModal(false)}
          >
            <Text style={styles.textStyle}>X</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: .5,
    padding: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: '#eee'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default UpdateItem;