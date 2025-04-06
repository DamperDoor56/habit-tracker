import React, {useState, useEffect} from 'react';
import {View, Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Plus} from 'lucide-react-native';
import {HabitList} from './components/HabitList';
import {AddHabitForm} from './components/AddHabitForm';
import {Habit} from './types/habit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoalCard} from './components/GoalCard';
import {GoalForm} from './components/GoalForm';

export default function Home() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitBeingEdited, setHabitBeingEdited] = useState<Habit | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openGoalForm, setIsOpenGoalForm] = useState<boolean>(false);
  const [goalPoints, setIsGoalPoints] = useState<string>('0');

  useEffect(() => {
    console.log('Loading Habits!');
    const loadHabits = async () => {
      const savedHabits = await AsyncStorage.getItem('habits');
      if (savedHabits) {
        setHabits(JSON.parse(savedHabits));
      }
    };

    loadHabits();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('habits', JSON.stringify(habits));
    console.log('Storing habits!');
  }, [habits]);

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

  const updateHabit = (habit: Habit) => {
    setIsEdit(true);
    setHabitBeingEdited(habit);
  };
  const handleDeleteHabit = (id: number) => {
    Alert.alert('¿Eliminar hábito?', 'Esta acción no se puede deshacer.', [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => setHabits(prev => prev.filter(habit => habit.id !== id)),
      },
    ]);
  };

  const onUpdate = (updatedHabit: Habit) => {
    setHabits(prev =>
      prev.map(h => (h.id === updatedHabit.id ? updatedHabit : h)),
    );
    setHabitBeingEdited(null); // Cierra el modal
  };
  const totalPoints = habits.reduce((acc, habit) => {
    if (habit.completed && habit.points) {
      const parsedPoints = parseInt(habit.points, 10);
      return acc + (isNaN(parsedPoints) ? 0 : parsedPoints);
    }
    return acc;
  }, 0);

  const renderScene = SceneMap({
    all: () => (
      <HabitList
        handleDeleteHabit={handleDeleteHabit}
        habits={habits}
        handleEditHabit={updateHabit}
        toggleComplete={toggleComplete}
      />
    ),
    checklist: () => (
      <HabitList
        handleDeleteHabit={handleDeleteHabit}
        handleEditHabit={updateHabit}
        habits={habits.filter(h => h.type === 'checklist')}
        toggleComplete={toggleComplete}
      />
    ),
    timer: () => (
      <HabitList
        handleDeleteHabit={handleDeleteHabit}
        handleEditHabit={updateHabit}
        habits={habits.filter(h => h.type === 'timer')}
        toggleComplete={toggleComplete}
      />
    ),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracker</Text>
      <GoalCard
        totalPoints={totalPoints}
        goalPoint={goalPoints}
        onOpenForm={() => setIsOpenGoalForm(true)}></GoalCard>

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
      {habitBeingEdited && (
        <AddHabitForm
          isEdit={isEdit}
          existingHabit={habitBeingEdited}
          onUpdate={onUpdate}
          onCancel={() => setHabitBeingEdited(null)}
        />
      )}
      {openGoalForm && (
        <GoalForm
          goalPoints={goalPoints}
          onClose={() => setIsOpenGoalForm(false)}
          setGoalPoints={setIsGoalPoints}
        />
      )}
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
    backgroundColor: '#023047',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
    color: '#ffff',
  },
  tabBar: {
    backgroundColor: '#415a77',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  indicator: {
    backgroundColor: '#8ecae6',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#669bbc',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
