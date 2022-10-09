import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Input from './Input';
import ModalDropdown from 'react-native-modal-dropdown';


function AddNewItem(props) {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [linkToItem, setLinkToItem] = useState('');
  const [categoryValue, setCategoryValue] = useState(null);

  const AddNewItem = () => {
    const item = {
      Name: itemName,
      description: itemDescription,
      link: linkToItem,
      category: categoryValue === 'Select A Category' ? 'Other' : categoryValue
    }
  }

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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => props.displayModal(false)}
              >
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
            </View>
            <View>
              <Text style={styles.modalText}>Add a New Item</Text>
              <View style={{ flex: 1, width: 300 }}>
                <Input
                  label='Item Name'
                  item={itemName}
                  setItem={(name) => setItemName(name)}
                />
                <Input
                  label='Item Description'
                  item={itemDescription}
                  setItem={setItemDescription}
                />
                <Input
                  label='Link to Item'
                  item={linkToItem}
                  setItem={setLinkToItem}
                />
                <ModalDropdown
                  options={props.categories}
                  showsVerticalScrollIndicator={true}
                  onSelect={(value) => setCategoryValue(value)}
                  style={{ borderColor: 'gray', borderWidth: .5, padding: 12, marginTop: 20 }}
                  defaultValue='Select A Category'
                  dropdownStyle={{ width: 300, borderColor: 'gray', borderWidth: .5 }}
                  dropdownTextStyle={{ color: 'black' }}
                />
                <Pressable
                  onPress={AddNewItem}
                  style={[styles.button, styles.buttonClose, { marginTop: 40 }]}
                >
                  <Text style={styles.textStyle}>Add Item</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
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