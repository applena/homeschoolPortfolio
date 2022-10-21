import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Button } from "react-native";
import Input from './Input';
import ModalDropdown from 'react-native-modal-dropdown';
import { Camera, CameraType } from 'expo-camera';
import Storage from './Storage';
import StorageError from "../helperFunctions/StorageError";


function AddNewItem(props) {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [linkToItem, setLinkToItem] = useState('');
  const [categoryValue, setCategoryValue] = useState(null);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);

  const allowCameraAccess = () => {
    requestPermission()
      .then(res => {
        res.granted ? setCameraReady(true) : setCameraReady(false);

      })
    // Camera.getCameraPermissionsAsync() // checks users permissions
    //   .then(res => {
    //     console.log('looking at users camera permissions', { res })
    //     // Object {
    //     //   "res": Object {
    //     //     "canAskAgain": true,
    //     //     "expires": "never",
    //     //     "granted": true,
    //     //     "status": "granted",
    //     //   },
    //     // }
    //     if(!res.granted){
    //       Camera.requestCameraPermissionsAsync()
    //         .then(response => {
    //           console.log('permission response', { response });

    //           // permission response Object {
    //           //   "response": Object {
    //           //     "canAskAgain": true,
    //           //     "expires": "never",
    //           //     "granted": true,
    //           //     "status": "granted",
    //           //   },
    //           // }

    //         })
    //     }
    //   })
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  // function takePhoto = () => {

  // }
  const addItemToStorageObj = (item, portfolio = {}, categoryValue) => {
    const categories = Object.keys(portfolio);

    // // if the category doesn't exist, add it with the item as the first value
    // if (portfolio === {} || !categories.includes(categoryValue)) {
    //   portfolio = { ...portfolio, categoryValue: [item] }
    // } else {
    //   // if the category does exist, find the category, and push the item into the array
    const selectedCategory = categories.find(cat => cat === categoryValue);
    selectedCategory ? portfolio.selectedCategory = [...portfolio.selectedCategory, item] : portfolio.categoryValue = [item];
    // }

    return portfolio;
  }

  const AddNewItem = () => {
    const item = {
      Name: itemName,
      description: itemDescription,
      link: linkToItem,
      category: categoryValue === 'Select A Category' ? 'Other' : categoryValue
    }

    Storage.load({
      key: 'portfolio',
    })
      .then(ret => {
        const data = addItemToStorageObj(item, ret, categoryValue);
        Storage.save({
          key: 'portfolio',
          data
        })
        props.hideModal();

      })
      .catch(err => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        const data = addItemToStorageObj(item, {}, categoryValue);
        Storage.save({
          key: 'portfolio',
          data
        })
      });
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

                {!cameraReady ?
                  <Button
                    onPress={allowCameraAccess}
                    title="Take a Photo"
                  />

                  :

                  <View >
                    <Camera
                      type={type}
                      onCameraReady={() => setCameraReady(true)}
                      takePictureAsync
                    >
                      <View >
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                          <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                      </View>
                    </Camera>
                  </View>
                }

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