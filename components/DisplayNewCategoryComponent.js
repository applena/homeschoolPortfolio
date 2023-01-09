import React from 'react';
import { Modal, View, TextInput } from 'react-native';

function DisplayNewCategoryComponent(props) {
  <Modal
    animationType="fade"
    transparent={true}
    visible={props.displayNewCategory}
    onRequestClose={() => {
      props.displayModal(!props.displayNewCategory);
    }}
  >
    <View>
      <TextInput
        label="Name Of Category"
        onChangeText={(value) => props.addCategory(value)}
      />
    </View>
  </Modal>
}

export default DisplayNewCategoryComponent;