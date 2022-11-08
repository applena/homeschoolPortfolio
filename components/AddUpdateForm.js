import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import ModalDropdown from 'react-native-modal-dropdown';
import Storage from './Storage';
import Input from './Input';

function AddUpdateForm(props) {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [linkToItem, setLinkToItem] = useState('');
  const [categoryValue, setCategoryValue] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  console.log('add/update form ', { itemName }, props.item)

  useEffect(() => {
    if (!props.newItem) {
      setItemName(props.item.Name);
      setItemDescription(props.item.description)
      setCategoryValue(props.item.category);
      setLinkToItem(props.item.link);
    }
    setDisplayForm(true);
  })

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
    // console.log('add item to storage', { item });
    // Object {
    //   "Name": "Book name",
    //   "category": "reading",
    //   "description": "Book",
    //   "link": "",
    // },

    const selectedCategory = props.categories.find(cat => cat === categoryValue);
    if (selectedCategory) {
      portfolio.map(thing => {
        if (selectedCategory === thing.label) {
          // console.log('found category', thing)
          thing.value = [...thing.value, item]
          // console.log('added item to portfolio', portfolio)
        }
      })
    }

    return portfolio;
  }

  const addNewItem = () => {
    const item = {
      Name: itemName,
      description: itemDescription,
      link: linkToItem,
      category: !categoryValue ? 'Other' : categoryValue
    }

    // console.log('add new item', { item })

    const data = addItemToStorageObj(item, props.portfolio, categoryValue);
    Storage.save({
      key: 'portfolio',
      data
    })
    props.updatePortfolio(data);
    props.hideModal();
  };

  const updateItem = () => {
    console.log('update item');
  }

  return (
    <View style={styles.centeredView}>
      {displayForm &&
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
            <Text style={styles.modalText}>{props.newItem ? 'Add a New Item' : 'Update Item'}</Text>
            <View style={{ flex: 1, width: 300 }}>
              <Input
                label='Item Name'
                item={itemName}
                setItem={(name) => setItemName(name)}
                defaultValue={itemName}
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
                onSelect={(value) => setCategoryValue(props.categories[value])}
                style={{ borderColor: 'gray', borderWidth: .5, padding: 12, marginTop: 20 }}
                defaultValue='Select A Category'
                dropdownStyle={{ width: 300, borderColor: 'gray', borderWidth: .5 }}
                dropdownTextStyle={{ color: 'black' }}
              />
              <Pressable
                onPress={props.newItem ? addNewItem : updateItem}
                style={[styles.button, styles.buttonClose, { marginTop: 40 }]}
              >
                <Text style={styles.textStyle}>Add Item</Text>
              </Pressable>
            </View>
          </View>
        </View>
      }
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



export default AddUpdateForm;