import React, {useEffect, useState} from 'react';
import {View, Text, Alert, FlatList, StyleSheet} from 'react-native';
import {HabitCard} from './HabitCard';
import {Habit} from '.././types/habit';
import {HabitListProps} from '.././types/habit-list';

export function HabitList({
  habits,
  handleEditHabit,
  handleDeleteHabit,
  toggleComplete,
}: HabitListProps) {
  const [habitsToExist, setHabitsToExist] = useState<Habit[]>(habits);
  useEffect(() => {
    setHabitsToExist(habits);
  }, [habits]);

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
