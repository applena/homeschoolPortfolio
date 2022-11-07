import React from 'react';
import { Text, View, Modal } from 'react-native';

function UpdateItem(props) {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.displayUpdateItem}
        onRequestClose={() => {
          props.displayModal(!props.displayUpdateItem);
        }}
      >
        <Text>Update Item</Text>
      </Modal>
    </View>
  )
}

export default UpdateItem;