/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import TaskItem from './components/TaskComponent/TaskComponent';
import TaskList from './components/TaskList/TaskList';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [toggledTasks, setToggledTasks] = useState<Set<string>>(new Set());

  // Función para alternar el estado de una tarea específica
  const handleToggle = (id: string) => {
    setToggledTasks(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };
  const tasks = [
    {id: '1', text: 'Comprar leche', points: '10'},
    {id: '2', text: 'Hacer ejercicio', points: '10'},
    {id: '3', text: 'Leer un libro', points: '10'},
    {id: '4', text: 'Revisar emails', points: '10'},
    {id: '5', text: 'Estudiar React Native', points: '10'},
    {id: '6', text: 'Llamar a mamá', points: '10'},
  ];
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.mainView}>
        <View style={styles.mainTextView}>
          <Text style={styles.mainText}>Welcome back</Text>
          <Text style={styles.username}>Username</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Today's points: 100</Text>
          <Text style={styles.infoText}>Today's goal: 130</Text>
        </View>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.taskArea}>
          <TaskList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#D9D9D9',
  },
  mainTextView: {
    paddingTop: 40,
    paddingLeft: 30,
    paddingBottom: 20,
    backgroundColor: '#366B85',
    textAlign: 'left',
  },
  mainView: {
    backgroundColor: '#366B85',
    textAlign: 'left',
  },
  infoView: {
    backgroundColor: '#5B7ED6',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 30,
    paddingVertical: 50,
    borderRadius: 20,
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  username: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 20,
  },
  taskArea: {
    backgroundColor: '#D9D9D9',
    height: '100%',
  },
});

export default App;
