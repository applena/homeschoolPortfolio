import React from 'react';
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';

function Header(props) {

  return (
    <View>
      <View style={{ flexDirection: 'row-reverse', padding: 40, marginBottom: 20 }}>
        <Text>Switch Students</Text>
        <Text></Text>
      </View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            style={styles.profilePic}
            source={require('../assets/blank-person.png')}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, alignContent: 'center' }}>
          <View></View>
          <View style={{ alignItems: 'center' }}>
            <Text>{props.name}</Text>
            <Text>grade: {props.grade}</Text>
          </View>
          <View></View>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Pressable
          onPress={() => props.displayPortfolio()}
          style={styles.tab}
        >
          <Text style={props.displayCalendar ? styles.active : styles.inactive}>Portfolio</Text>
        </Pressable>
        <Pressable
          onPress={() => props.displayCalendar()}
          style={styles.tab}
        >
          <Text style={props.displayCalendar ? styles.active : styles.inactive}>Calendar</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profilePic: {
    width: 70,
    height: 70
  },
  active: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  inactive: {
    color: 'light gray',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  tab: {
    padding: 10,
  }
});


export default Header;