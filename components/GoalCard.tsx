import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {GoalCardProps} from '../types/goal-card';
import {Settings} from 'lucide-react-native';

export function GoalCard({totalPoints, onOpenForm, goalPoint}: GoalCardProps) {
  return (
    <View style={[styles.card]}>
      <View>
        <Text style={styles.content}> Puntos actuales: {totalPoints}</Text>
        <Text style={styles.content}> Objetivo: {goalPoint}</Text>
      </View>
      <TouchableOpacity onPress={onOpenForm} style={styles.button}>
        <Settings color={'#FFFFFF'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 200,
  },
  content: {
    flexDirection: 'column',
    color: '#FFFFFF',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
