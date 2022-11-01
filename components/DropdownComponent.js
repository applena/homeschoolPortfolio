import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const DropdownComponent = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // console.log('dropdown component', props)
  //   "portfolio": Array [
  //     Object {
  //       "label": "reading",
  //       "value": Object {},
  //     },
  //     Object {
  //       "label": "writing",
  //       "value": Object {},
  //     },
  //     Object {
  //       "label": "other",
  //       "value": Object {},
  //     },
  //   ],
  // }


  const selectItem = (item) => {
    console.log('select item', { item })
    if (!item.value) props.addItem(item.category)
  }

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <ScrollView>
      {/* {renderLabel()} */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.portfolio}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder='Select Category'
        searchPlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={props.category}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          props.setParentValue(item.value);
        }}
      // onChange={item => selectItem(item)}
      // renderLeftIcon={() => (
      //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      // )}
      />
    </ScrollView>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    overflow: 'scroll'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});