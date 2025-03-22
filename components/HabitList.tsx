import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {HabitCard} from './HabitCard';
import {HabitListProps} from '../types/habit-list';

export function HabitList({habits, toggleComplete}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay hábitos para mostrar</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={habits}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <HabitCard
          habit={item}
          onToggleComplete={() => toggleComplete(item.id)}
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
