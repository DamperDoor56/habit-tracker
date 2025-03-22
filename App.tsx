import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Plus} from 'lucide-react-native';
import {HabitList} from './components/HabitList';
import {AddHabitForm} from './components/AddHabitForm';
import {Habit} from './types/habit';

export default function Home() {
  const [showAddForm, setShowAddForm] = useState(false);

  const [habits, setHabits] = useState<Habit[]>([
    {id: 1, name: 'Beber agua', type: 'checklist', completed: false},
    {
      id: 2,
      name: 'Meditar',
      type: 'timer',
      duration: 10 * 60,
      completed: false,
    },
    {id: 3, name: 'Leer', type: 'timer', duration: 20 * 60, completed: false},
    {id: 4, name: 'Ejercicio', type: 'checklist', completed: false},
  ]);

  const addHabit = (habit: Omit<Habit, 'id' | 'completed'>) => {
    setHabits([...habits, {...habit, id: Date.now(), completed: false}]);
    setShowAddForm(false);
  };

  const toggleComplete = (id: number) => {
    setHabits(
      habits.map(habit =>
        habit.id === id ? {...habit, completed: !habit.completed} : habit,
      ),
    );
  };

  // Configuración de Tabs
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'Todos'},
    {key: 'checklist', title: 'Checklist'},
    {key: 'timer', title: 'Temporizador'},
  ]);

  const renderScene = SceneMap({
    all: () => <HabitList habits={habits} toggleComplete={toggleComplete} />,
    checklist: () => (
      <HabitList
        habits={habits.filter(h => h.type === 'checklist')}
        toggleComplete={toggleComplete}
      />
    ),
    timer: () => (
      <HabitList
        habits={habits.filter(h => h.type === 'timer')}
        toggleComplete={toggleComplete}
      />
    ),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracker</Text>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
          />
        )}
      />

      {showAddForm ? (
        <AddHabitForm onAdd={addHabit} onCancel={() => setShowAddForm(false)} />
      ) : (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowAddForm(true)}>
          <Plus color="white" size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  tabBar: {
    backgroundColor: '#6200ee',
  },
  indicator: {
    backgroundColor: 'white',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200ee',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
