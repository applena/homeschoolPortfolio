import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Button, ScrollView, Pressable } from 'react-native';
import DropdownComponent from './DropdownComponent';
import AddNewItem from './AddNewItem';
import Storage from './Storage';

function Portfolio(props) {
  const [displayNewItem, setDisplayNewItem] = useState(false);
  const [categories, setCategories] = useState(['Reading Log', 'Writing']);
  const [portfolio, setPortfolio] = useState({})

  // console.log('portfolio render', { portfolio }, Object.entries(portfolio));
  console.log(Object.entries(portfolio).length, { categories })
  // portfolio = {
  //   books: [{name: 'the night diary', description: 'book', link: 'http...'}],
  //   writing: [{name: 'stonewall riots', description: 'research paper', link: 'https...'}]
  // }

  useEffect(() => {
    Storage.load({
      key: 'portfolio',
    })
      .then(res => {
        setPortfolio(res);
        setCategories(Object.keys(portfolio));
      })
      .catch(err => {
        // console.warn(err.message);
        console.warn('no portfolio found in storage');
        // setPortfolio({ reading: {}, writing: {}, other: {} });
        setCategories(['reading', 'writing', 'other', 'add categpry']);
      });
  }, [])

  const addItem = (category = 0) => {
    setDisplayNewItem(true);
  }

  return (
    Object.keys(portfolio).length || categories.length ?
      <View style={{ width: 500, marginTop: 10 }}>
        <Text style={styles.title}>Portfolio</Text>
        {displayNewItem &&
          <AddNewItem
            displayNewItem={displayNewItem}
            displayModal={(boo) => setDisplayNewItem(boo)}
            categories={categories}
            setCategories={(category) => setCategories(category)}
            hideModal={() => setDisplayNewItem(false)}
          />
        }
        <ScrollView style={styles.container}>
          {Object.entries(portfolio).length ?
            Object.entries(portfolio).map((category, i) => {
              <View key={`cat_${i}`}>
                <DropdownComponent
                  key={`catDD_${i}`}
                  category={category[0]}
                  addItem={addItem}
                  data={category[1]}
                />
              </View>
            })
            :
            categories.map((cat, i) => (
              <DropdownComponent
                key={`catDD_${i}`}
                category={cat}
                addItem={addItem}
                data={[]}
              />
            ))
          }
        </ScrollView>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setDisplayNewItem(true)}
        >
          <Text style={styles.textStyle}>Add New Item</Text>
        </Pressable>
      </View>
      :
      <View>
        {displayNewItem &&
          <AddNewItem
            displayNewItem={displayNewItem}
            displayModal={(boo) => setDisplayNewItem(boo)}
            categories={categories}
            setCategories={(category) => setCategories(category)}
            hideModal={() => setDisplayNewItem(false)}
          />
        }
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setDisplayNewItem(true)}
        >
          <Text style={styles.textStyle}>Add New Item</Text>
        </Pressable>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderColor: 'gray',
    borderWidth: 0.5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default Portfolio;