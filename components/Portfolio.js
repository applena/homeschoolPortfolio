import React, { useEffect, useState, useMemo } from 'react';
import { Text, StyleSheet, View, ScrollView, Pressable } from 'react-native';
import DropdownComponent from './DropdownComponent';
import AddNewItem from './AddNewItem';
import Storage from './Storage';

function Portfolio(props) {
  const [displayNewItem, setDisplayNewItem] = useState(false);
  const [categories, setCategories] = useState(['Reading Log', 'Writing']);
  const [portfolio, setPortfolio] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);

  // console.log('portfolio', { categories })

  const categoryItems = useMemo(() => portfolio.find(c => c.label === selectedCategory)?.value || [], [selectedCategory, portfolio]);

  console.log('portfolio render', { selectedCategory, portfolio }, portfolio.length, categoryItems);

  useEffect(() => {
    Storage.load({
      key: 'portfolio',
    })
      .then(res => {
        console.log('results from protfolio use effect', { res })
        setPortfolio(res);
        const categories = res.map(item => item.label);
        // console.log('categories from storage', { categories })
        setCategories(categories);
      })
      .catch(err => {
        // console.warn(err.message);
        console.warn('no portfolio found in storage');
        setPortfolio([
          { label: 'reading', value: [] },
          { label: 'writing', value: [] },
          { label: 'other', value: [] }
        ]);
        setCategories(['reading', 'writing', 'other']);
      });
  }, [])

  const addItem = (category = 0) => {
    setDisplayNewItem(true);
  }

  return (
    portfolio.length && categories.length ?
      <View style={{ width: 500, marginTop: 10 }}>
        <Text style={styles.title}>Portfolio</Text>
        {displayNewItem &&
          <AddNewItem
            displayNewItem={displayNewItem}
            displayModal={(boo) => setDisplayNewItem(boo)}
            categories={categories}
            setCategories={(category) => setCategories(category)}
            hideModal={() => setDisplayNewItem(false)}
            portfolio={portfolio}
          />
        }
        <ScrollView style={styles.container}>
          {portfolio.length &&
            <View>
              <DropdownComponent
                portfolio={portfolio}
                addItem={addItem}
                setParentValue={(value) => { setSelectedCategory(value) }}
              />
            </View>
          }
        </ScrollView>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setDisplayNewItem(true)}
        >
          <Text style={styles.textStyle}>Add New Item</Text>
        </Pressable>
        {categoryItems.map((item, i) =>
        (
          <View
            key={`item_${i}`}
          >
            <Text style={{ color: 'black' }}>{item.Name}</Text>
            <Text style={{ color: 'black' }}>{item.description}</Text>
            <Text style={{ color: 'black' }}>{item.link}</Text>
            <Text style={{ color: 'black' }}>{item.img}</Text>
          </View>
        )
        )}
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