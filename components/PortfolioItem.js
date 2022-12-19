import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import UpdateItem from './UpdateItem';

function PortfolioItem(props) {
  const [displayUpdateItem, setDisplayUpdateItem] = useState(false);

  // console.log('portfoilo items', { props })

  return (
    <View
      style={styles.container}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View></View>
        <Text style={styles.textStyleHeader}>{props.item.name}</Text>
        <Pressable
          onPress={() => setDisplayUpdateItem(true)}
          style={{ paddingTop: 10, marginRight: 10 }}
        >
          <Text>Edit</Text>
        </Pressable>
      </View>
      <Text style={styles.textStyle}>Description: {props.item.description}</Text>
      <Text style={styles.textStyle}>Link: {props.item.link}</Text>
      <Text style={styles.textStyle}>{props.item.photo}</Text>
      {displayUpdateItem &&
        <UpdateItem
          displayUpdateItem={displayUpdateItem}
          displayModal={(boo) => setDisplayUpdateItem(boo)}
          item={props.item}
          updateSelectedCategory={(cat) => props.updateSelectedCategory(cat)}
          categories={props.categories}
          portfolio={props.portfolio}
          updatePortfolio={(value) => props.updatePortfolio(value)}
          hideModal={() => setDisplayUpdateItem(false)}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 10
  },
  textStyle: {
    color: 'black',
    padding: 5,
  },
  textStyleHeader: {
    fontSize: 20,
    padding: 5,
    textAlign: 'center'
  }
})

export default PortfolioItem;