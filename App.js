import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from './components/Header';
import Portfolio from './components/Portfolio';

export default function App() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          name={name}
          grade={grade}
        />
        <Portfolio />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
