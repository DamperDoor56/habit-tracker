import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};
const TaskItem = ({task, toggle}: {task: Task; toggle: () => void}) => {
  return (
    <View style={styles.container}>
      <CheckBox value={task.completed} onTouchEnd={toggle} />
      <Text style={[styles.text, task.completed && styles.completed]}>
        {task.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskItem;
