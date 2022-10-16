import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import NewUser from './components/NewUser';
import Storage from './components/Storage';


export default function App() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState(0);
  const [displayWelcomeScreen, setDisplayWelcomeScreen] = useState(true);

  useEffect(() => {
    Storage.save({
      key: 'basicInfo',
      data: {
        name: '',
        grade: 0
      }
    })
    Storage.load({
      key: 'basicInfo',
    })
      .then(ret => {
        // found data go to then()
        if (ret.name || ret.grade) {
          setDisplayWelcomeScreen(false);
          setName(ret.name);
          setGrade(ret.grade);
        }
      })
      .catch(err => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      });
  })

  const updateStudent = (obj) => {
    // {label: 'name', value: 'ilya'}
    obj.label === 'name' ? setName(obj.value) : setGrade(obj.value);

    // save this information in the cloud or app storage
    Storage.save({
      key: 'basicInfo', // Note: Do not use underscore("_") in key!
      data: {
        name,
        grade
      },

      expires: null
    });
  }

  return (
    <View style={styles.container}>
      {displayWelcomeScreen ?
        <NewUser
          studentName={name}
          setStudent={(obj) => updateStudent(obj)}
          studentGrade={grade}
          displayPage={() => setDisplayWelcomeScreen(false)}
        />

        :

        <ScrollView>
          <Header
            name={name}
            grade={grade}
          />
          <Portfolio />
        </ScrollView>
      }
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
