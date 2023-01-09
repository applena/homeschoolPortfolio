import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import NewUser from './components/NewUser';
import Storage from './components/Storage';
import Calendar from './components/calendar/Calendar';


export default function App() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState(0);
  const [displayWelcomeScreen, setDisplayWelcomeScreen] = useState(true);
  const [displayPortfolio, setDisplayPortfolio] = useState(true);

  // console.log('rendering app', { name, grade });

  useEffect(() => {

    // Storage.remove({ key: 'name' });
    // Storage.remove({ key: 'grade' });
    // Storage.remove({ key: 'portfolio' });

    Storage.load({
      key: 'name',
    })
      .then(ret => {
        // console.log('key with name found', { ret })
        if (ret.name) {
          setDisplayWelcomeScreen(false);
          setName(ret.name);
        }
      })
      .catch(err => {
        // console.warn('in the error conditional', err.name)
        setDisplayWelcomeScreen(true);
      })

    Storage.load({
      key: 'grade',
    })
      .then(ret => {
        // console.log('key with grade found', { ret })
        if (ret.grade) {
          setDisplayWelcomeScreen(false);
          setGrade(ret.grade);
        }
      })
      .catch(err => {
        // console.warn('in the error conditional', err.name)
        setDisplayWelcomeScreen(true);
      })
  })

  const updateStudent = (obj) => {
    // {label: 'name', value: 'ilya'}
    // console.log('update student', { obj });
    if (obj.label === 'name') {
      setName(obj.value);
      Storage.save({
        key: 'name', // Note: Do not use underscore("_") in key!
        data: {
          name: obj.value
        },

        expires: null
      });
    } else {
      setGrade(obj.value);
      Storage.save({
        key: 'grade', // Note: Do not use underscore("_") in key!
        data: {
          grade: obj.value
        },

        expires: null
      });
    }


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

        <View style={styles.main}>
          <Header
            name={name}
            grade={grade}
            displayPortfolio={() => { setDisplayPortfolio(true) }}
            displayCalendar={() => { setDisplayPortfolio(false) }}
          />
          {displayPortfolio ?
            <Portfolio />
            :
            <Calendar />
          }
        </View>
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
  main: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderColor: 'red',
    borderWidth: .5
  }
});
