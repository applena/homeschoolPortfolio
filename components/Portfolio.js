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
  const [currentItemNumber, setCurrentItemNumber] = useState(0);

  console.log({ selectedCategory, portfolio, categoryItems })

  const categoryItems = useMemo(() => {
    // console.log('use memo', { portfolio, selectedCategory });
    const portfolioCategoryItems = selectedCategory ? portfolio[selectedCategory] || [] : [];
    // console.log('!!!!!!!!!!!!!!', portfolioCategoryItems)
    return portfolioCategoryItems;
  }, [selectedCategory, portfolio]);

  const dropdownArray = useMemo(() => {
    let newDropdownArrary = [];
    for (const [key, value] of Object.entries(portfolio)) {
      newDropdownArrary.push({ label: key, value });
    }
    return newDropdownArrary;
  }, [portfolio]);

  // console.log({ categoryItems, selectedCategory })

  useEffect(() => {
    Storage.load({
      key: 'portfolio',
    })
      .then(res => {
        // console.log('results from protfolio use effect', { res })
        setPortfolio(res);
        // const categories = res.map(item => item.label);
        // setCategories(categories);
        setCategories(Object.keys(res));
      })
      .catch(err => {
        // console.warn(err.message);
        console.warn('no portfolio found in storage');
        // setPortfolio([
        //   { label: 'reading', value: [] },
        //   { label: 'writing', value: [] },
        //   { label: 'other', value: [] }
        // ]);
        setCategories(['reading', 'writing', 'other']);
        setPortfolio({
          reading: [],
          writing: [],
          other: []
        })
      });
  }, [])

  const addItem = (category = 0) => {
    setDisplayNewItem(true);
  }

  return (
    <View style={{ width: 500, marginTop: 10 }}>
      <Text style={styles.title}>Portfolio</Text>
      {Object.keys(portfolio).length && categories.length ?
        <View>
          {displayNewItem &&
            <AddNewItem
              displayNewItem={displayNewItem}
              displayModal={(boo) => setDisplayNewItem(boo)}
              categories={categories}
              setCategories={(category) => setCategories(category)}
              hideModal={() => setDisplayNewItem(false)}
              portfolio={portfolio}
              updatePortfolio={(port) => setPortfolio({ ...port })}
              updateSelectedCategory={(cat) => setSelectedCategory(cat)}
              increaseItemNumber={() => {
                let tempItemNum = currentItemNumber + 1;
                setCurrentItemNumber(tempItemNum)
              }}
              currentItemNumber={currentItemNumber}
            />
          }
          <ScrollView style={styles.container}>
            <View>
              <DropdownComponent
                portfolio={dropdownArray}
                addItem={addItem}
                setParentValue={(value) => { setSelectedCategory(value) }}
                defalutValue={selectedCategory}
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
                  updateSelectedCategory={(cat) => setSelectedCategory(cat)}
                  categories={categories}
                  portfolio={portfolio}
                  updatePortfolio={(value) => { console.log('setportfolio', { value }); setPortfolio({ ...value }) }}
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