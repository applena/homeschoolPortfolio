import React, { useEffect, useState, useMemo } from 'react';
import { Text, StyleSheet, View, ScrollView, Pressable } from 'react-native';
import DropdownComponent from './DropdownComponent';
import AddNewItem from './AddNewItem';
import Storage from './Storage';
import PortfolioItem from './PortfolioItem';

function Portfolio(props) {
  const [displayNewItem, setDisplayNewItem] = useState(false);
  const [categories, setCategories] = useState(['Reading Log', 'Writing']);
  const [portfolio, setPortfolio] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);

  // console.log({ selectedCategory, portfolio, categoryItems })

  const categoryItems = useMemo(() => selectedCategory ? portfolio.find(c => c.label === selectedCategory)?.value || [] : [], [selectedCategory, portfolio]);

  // console.log('portfolio render', { selectedCategory, portfolio, categories }, portfolio.length, categoryItems);

  useEffect(() => {
    Storage.load({
      key: 'portfolio',
    })
      .then(res => {
        // console.log('results from protfolio use effect', { res })
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
    <View style={{ width: 500, marginTop: 10 }}>
      <Text style={styles.title}>Portfolio</Text>
      {portfolio.length && categories.length ?
        <View>
          {displayNewItem &&
            <AddNewItem
              displayNewItem={displayNewItem}
              displayModal={(boo) => setDisplayNewItem(boo)}
              categories={categories}
              setCategories={(category) => setCategories(category)}
              hideModal={() => setDisplayNewItem(false)}
              portfolio={portfolio}
              updatePortfolio={(port) => setPortfolio(port)}
            />
          }
          <ScrollView style={styles.container}>
            <View>
              <DropdownComponent
                portfolio={portfolio}
                addItem={addItem}
                setParentValue={(value) => { setSelectedCategory(value) }}
              />
            </View>
          </ScrollView>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setDisplayNewItem(true)}
          >
            <Text style={styles.textStyle}>Add New Item</Text>
          </Pressable>
          {
            categoryItems && categoryItems.map((item, i) => (
              <ScrollView key={`item_${i}`}>
                <PortfolioItem
                  item={item}
                />
              </ScrollView>
            )
            )
          }
        </View>
        :
        <View></View>
      }
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