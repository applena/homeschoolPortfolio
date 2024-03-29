import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import CameraComponent from './Camera';
import ModalDropdown from 'react-native-modal-dropdown';
import Storage from './Storage';
import Input from './Input';
import uuid from 'react-uuid';

function AddUpdateForm(props) {
  const [itemName, setItemName] = useState(props?.item?.name || '');
  const [itemDescription, setItemDescription] = useState(props?.item?.description || '');
  const [linkToItem, setLinkToItem] = useState(props?.item?.link || '');
  const [categoryValue, setCategoryValue] = useState(props?.item?.category || null);
  const [photo, setPhoto] = useState(props?.item?.photo || 'no photo yet');

  const addItemToPortfolioObj = (item, portfolio = {}, categoryValue) => {

    const selectedCategory = props.categories.find(cat => cat === categoryValue);
    // console.log('storage', { selectedCategory }, portfolio);

    if (selectedCategory) {
      portfolio[selectedCategory].push(item);
    }

    return portfolio;
  }

  const findAndRemoveItem = () => {
    const selectedCategory = props.categories.find(cat => cat === categoryValue);
    console.log('find and remove', { selectedCategory, categoryValue });

    const newPortfolioCategory = props.portfolio[selectedCategory].filter(item => item.itemNumber !== props.item.itemNumber);

    console.log('find and remove', newPortfolioCategory)
    const newPortfolio = { ...props.portfolio, [selectedCategory]: newPortfolioCategory }

    // console.log('find and remove', { newPortfolio })

    props.updatePortfolio(newPortfolio);
    props.hideModal();
  }

  const editItem = () => {
    // console.log(props.portfolio, categoryValue, props.categoryValue, props.item)
    return props.portfolio[categoryValue].map(item => {
      if (item.itemNumber === props.item.itemNumber) {
        // console.log('found the item in edit', item)
        item = {
          itemNumber: props.item.itemNumber,
          name: itemName,
          description: itemDescription,
          link: linkToItem,
          photo: photo,
          category: !categoryValue ? 'Other' : categoryValue
        }
      }
      return item;
    });
  }

  const addUpdateItem = () => {

    // console.log('add/update', { item }, props.portfolio[categoryValue])
    let data;

    if (!props.newItem) {
      props.portfolio[categoryValue] = editItem();
      data = props.portfolio;
    } else {
      let item = {
        itemNumber: uuid(),
        name: itemName,
        description: itemDescription,
        link: linkToItem,
        photo: photo,
        category: !categoryValue ? 'Other' : categoryValue
      }
      data = addItemToPortfolioObj(item, props.portfolio, categoryValue);
    }

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
      <ScrollView style={styles.modalView}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => props.displayModal(false)}
          >
            <Text style={styles.textStyle}>X</Text>
          </Pressable>
        </View>
        <View >
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

            <View>
              <Text>DEBUG:</Text>
              <Text>{photo}</Text>
            </View>

            {photo !== 'no photo yet' ?
              <View>
                <Text>Image Below!!!!</Text>
                <Image style={{ minHeight: 500 }} source={{ uri: photo }} />
              </View>
              :
              <CameraComponent
                setPhoto={setPhoto}
              />

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
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Pressable
                onPress={addUpdateItem}
                style={[styles.button, styles.buttonClose, { marginTop: 40 }]}
              >
                <Text style={styles.submitText}>Submit</Text>
              </Pressable>
              <Pressable
                onPress={findAndRemoveItem}
              >
                <Text>Delete Item</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
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
  takePhoto: {
    border: 2,
    backgroundColor: 'black',
    color: 'white',
    padding: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
    backgroundColor: '#eee'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    elevation: 2,
    marginBottom: 10
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 100
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});



export default AddUpdateForm;