import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {GoalCardProps} from '../types/goal-card';

export function GoalCard({totalPoints, goalPoint}: GoalCardProps) {
  return (
    <View style={[styles.card]}>
      <View>
        <Text style={styles.content}> Puntos actuales: {totalPoints}</Text>
        <Text style={styles.content}> Objetivo: {goalPoint}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {paddingBottom: 30},
  content: {
    flexDirection: 'column',
    color: '#FFFFFF',
    alignItems: 'center',
    gap: 10,
  },
});
