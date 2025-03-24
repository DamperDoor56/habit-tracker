import React, {useEffect, useState} from 'react';
import {View, Text, Alert, FlatList, StyleSheet} from 'react-native';
import {HabitCard} from './HabitCard';
import {Habit} from '.././types/habit';
import {HabitListProps} from '.././types/habit-list';

export function HabitList({habits, toggleComplete}: HabitListProps) {
  const [habitsToExist, setHabitsToExist] = useState<Habit[]>(habits);
  useEffect(() => {
    setHabitsToExist(habits);
  }, [habits]);
  const handleDeleteHabit = (id: number) => {
    console.log('Intentando eliminar hábito con id:', id); // 💥
    Alert.alert('¿Eliminar hábito?', 'Esta acción no se puede deshacer.', [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          console.log('Eliminado');
          setHabitsToExist(prev => prev.filter(habit => habit.id !== id));
        },
      },
    ]);
  };

  const handleEditHabit = (habitToEdit: Habit) => {
    Alert.prompt(
      'Editar hábito',
      'Cambiá el nombre del hábito:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: newName => {
            if (newName && newName.trim() !== '') {
              setHabitsToExist(prev =>
                prev.map(habit =>
                  habit.id === habitToEdit.id
                    ? {...habit, name: newName}
                    : habit,
                ),
              );
            }
          },
        },
      ],
      'plain-text',
      habitToEdit.name,
    );
  };

  if (habitsToExist.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay hábitos para mostrar</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={habitsToExist}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <HabitCard
          habit={item}
          onToggleComplete={() => toggleComplete(item.id)}
          onEditHabit={() => handleEditHabit(item)}
          onDeleteHabit={() => handleDeleteHabit(item.id)}
        />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
});
