import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

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
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
          <Text>{props.name}</Text>
          <Text>{props.grade}</Text>
        </View>
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