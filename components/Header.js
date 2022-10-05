import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

function Header(props) {

  return (
    <View>
      <Text>Switch Students</Text>
      <View>
        <Image
          style={styles.profilePic}
          source={require('../assets/blank-person.png')}
        />
        <Text>{props.name}</Text>
        <Text>{props.grade}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profilePic: {
    width: 70,
    height: 70
  }
});


export default Header;