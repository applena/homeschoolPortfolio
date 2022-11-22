import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Button, TouchableOpacity, ShadowPropTypesIOS } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import ModalDropdown from 'react-native-modal-dropdown';
import Storage from './Storage';
import Input from './Input';

function AddUpdateForm(props) {
  const [itemName, setItemName] = useState(props?.item?.name || '');
  const [itemDescription, setItemDescription] = useState(props?.item?.description || '');
  const [linkToItem, setLinkToItem] = useState(props?.item?.link || '');
  const [categoryValue, setCategoryValue] = useState(props?.item?.category || null);
  const [cameraReady, setCameraReady] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // console.log('add/update form ', props.item)

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

  // function takePhoto() {
  //   Camera.onCameraReady(() => {
  //     Camera.takePictureAsync()
  //       .then(res => console.log('camera results:', { res }, res.uri))
  //   })
  // }

  const addItemToStorageObj = (item, portfolio = {}, categoryValue) => {

    const selectedCategory = props.categories.find(cat => cat === categoryValue);
    // console.log({ selectedCategory }, portfolio[selectedCategory]);

    if (selectedCategory) {
      portfolio[selectedCategory].push(item);
    }

    return portfolio;
  }

  const findAndRemoveItem = () => {
    const selectedCategory = props.categories.find(cat => cat === categoryValue);

    const newPortfolioCategory = props.portfolio[selectedCategory].filter(item => item.itemNumber !== props.item.itemNumber);

    const newPortfolio = { ...props.portfolio, [selectedCategory]: newPortfolioCategory }

    // console.log('find and remove', { newPortfolio })

    props.updatePortfolio(newPortfolio);
  }

  const editItem = () => {
    return props.portfolio.map(item => {
      if (item.itemNumber === props.item.itemNumber) {
        item = {
          itemNumber: props.item.itemNumber,
          name: itemName,
          description: itemDescription,
          link: linkToItem,
          cateory: !categoryValue ? 'Other' : categoryValue
        }
      }
      return item;
    });
  }

  const addUpdateItem = () => {

    let newPortfolio = null

    const item = {
      itemNumber: uuid(),
      name: itemName,
      description: itemDescription,
      link: linkToItem,
      category: !categoryValue ? 'Other' : categoryValue
    }

    if (!props.newItem) {
      newPortfolio = editItem()
    } else {
      props.portfolio.categoryValue = [...props.portfolio.categoryValue, item]
      newPortfolio = props.portfolio
    }
    // console.log('add/update', { item })

    const data = addItemToStorageObj(item, newPortfolio, categoryValue);
    Storage.save({
      key: 'portfolio',
      data
    })

    props.updatePortfolio(data);
    props.updateSelectedCategory(categoryValue);
    props.hideModal();
  };

  return (
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
          <Text style={styles.modalText}>{props.newItem ? 'Add a New Item' : 'Update Item'}</Text>
          <View style={{ flex: 1, width: 300 }}>
            <Input
              label='Item Name'
              item={itemName}
              setItem={(name) => setItemName(name)}
            />
            <Input
              label='Item Description'
              item={itemDescription}
              setItem={(description) => setItemDescription(description)}
            />
            <Input
              label='Link to Item'
              item={linkToItem}
              setItem={(link) => setLinkToItem(link)}
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
                  // onClick={takePhoto()}
                  takePictureAsync={(res) => setPhotoURI(res.uri)}
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
              defaultValue={categoryValue ? categoryValue : 'Select A Category'}
              dropdownStyle={{ width: 300, borderColor: 'gray', borderWidth: .5 }}
              dropdownTextStyle={{ color: 'black' }}
            />
            <Pressable
              onPress={addUpdateItem}
              style={[styles.button, styles.buttonClose, { marginTop: 40 }]}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
            <Pressable
              onPress={findAndRemoveItem}
            >
              <Text>Delete Item</Text>
            </Pressable>
          </View>
        </View>
      </View>
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