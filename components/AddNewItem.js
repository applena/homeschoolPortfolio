import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import AddUpdateForm from "./AddUpdateForm";


function AddNewItem(props) {

  // console.log('add new item', { props })

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.displayNewItem}
        onRequestClose={() => {
          props.displayModal(!props.displayNewItem);
        }}
      >
        <AddUpdateForm
          displayModal={(boo) => props.displayModal(boo)}
          categories={props.categories}
          newItem={true}
          portfolio={props.portfolio}
          updatePortfolio={(value) => props.updatePortfolio(value)}
          hideModal={() => props.hideModal()}
          updateSelectedCategory={(cat) => props.updateSelectedCategory(cat)}
          increaseItemNumber={props.increaseItemNumber}
          currentItemNumber={props.currentItemNumber}
        />

      </Modal>
    </View>
  )
};

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


export default AddNewItem;