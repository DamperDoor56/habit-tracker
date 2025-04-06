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
import {GoalAchievedPopup} from './components/GoalArchived';

export default function Home() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitBeingEdited, setHabitBeingEdited] = useState<Habit | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openGoalForm, setIsOpenGoalForm] = useState<boolean>(false);
  const [goalPoints, setIsGoalPoints] = useState<string>('0');
  const [hasReachedGoal, setHasReachedGoal] = useState<boolean>(false);
  const [goalLoaded, setGoalLoaded] = useState<boolean>(false);

  // This useEffect retrieves data from async storage when the app is open
  useEffect(() => {
    const loadHabits = async () => {
      const savedHabits = await AsyncStorage.getItem('habits');
      const savedDate = await AsyncStorage.getItem('lastResetDate');
      const savedGoal = await AsyncStorage.getItem('goalPoints');
      const today = new Date().toDateString();

      if (savedGoal !== null) {
        // If a goal was saved previously, it sets that value into goalPoints
        setIsGoalPoints(savedGoal);
        console.log('🎯 Goal Loaded:', savedGoal);
      }
      setGoalLoaded(true);

      if (savedHabits) {
        // If there's saved habits, it retrieves and parse them from JSON so we can use them
        let parsedHabits = JSON.parse(savedHabits);

        if (savedDate !== today) {
          // If today’s date is different from when the habit is completed,
          // it reset all habits (completed: false) .
          parsedHabits = parsedHabits.map((habit: Habit) => ({
            ...habit,
            completed: false,
          }));
          await AsyncStorage.setItem('lastResetDate', today);
          await AsyncStorage.setItem('goalPopupShown', 'false');
          // Resets the goalPopupShown flag so the popup can show again when the user reaches the goal
          // next day
        }

        setHabits(parsedHabits);
      } else {
        await AsyncStorage.setItem('lastResetDate', today);
        await AsyncStorage.setItem('goalPopupShown', 'false');
        // If there were no saved habits, it reset date and popup flag anyways
      }
    };

    loadHabits();
  }, []);

  // Checks and saves habits in Async Storage
  useEffect(() => {
    AsyncStorage.setItem('habits', JSON.stringify(habits));
    console.log('Storing habits!');
  }, [habits]);

  // Checks and saves goals in Async Storage
  useEffect(() => {
    if (goalLoaded && goalPoints !== '0') {
      AsyncStorage.setItem('goalPoints', goalPoints)
        .then(() => console.log('🎯 goal saved:', goalPoints))
        .catch(err => console.error('Error al guardar goalPoints:', err));
    }
  }, [goalPoints, goalLoaded]);

  // add Habit and closes form
  const addHabit = (habit: Omit<Habit, 'id' | 'completed'>) => {
    setHabits([...habits, {...habit, id: Date.now(), completed: false}]);
    setShowAddForm(false);
  };

  // Complete habit
  const toggleComplete = (id: number) => {
    setHabits(
      habits.map(habit =>
        habit.id === id ? {...habit, completed: !habit.completed} : habit,
      ),
    );
  };

  // Tabs selection
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
  useEffect(() => {
    const checkGoal = async () => {
      const popupShown = await AsyncStorage.getItem('goalPopupShown');
      const goal = parseInt(goalPoints, 10);
      console.log('🎯 Revisando objetivo:', goal, 'Total:', totalPoints);

      if (!isNaN(goal) && totalPoints >= goal && popupShown !== 'true') {
        setHasReachedGoal(true);
        await AsyncStorage.setItem('goalPopupShown', 'true');
      }
    };

    checkGoal();
  }, [totalPoints, goalPoints]);

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
      {/* Success animation*/}
      <GoalAchievedPopup
        visible={hasReachedGoal}
        onClose={() => setHasReachedGoal(false)}
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
