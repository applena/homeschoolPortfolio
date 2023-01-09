import React from 'react';
import { Modal, Text, View } from 'react-native';

function DisplayNewCategory(props) {
  <Modal
    animationType="fade"
    transparent={true}
    visible={props.displayNewCategory}
    onRequestClose={() => {
      props.displayModal(!props.displayNewCategory);
    }}
  ></Modal>
}

export default DisplayNewCategory;