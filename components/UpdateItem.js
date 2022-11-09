import React from 'react';
import { Text, View, Modal } from 'react-native';
import AddUpdateForm from './AddUpdateForm';

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
        <AddUpdateForm
          displayModal={(boo) => props.displayModal(boo)}
          categories={props.categories}
          newItem={false}
          portfolio={props.portfolio}
          updatePortfolio={(value) => props.updatePortfolio(value)}
          hideModal={() => props.hideModal()}
          item={props.item}
          updateSelectedCategory={(cat) => props.updateSelectedCategory(cat)}
        />
      </Modal>
    </View>
  )
}

export default UpdateItem;