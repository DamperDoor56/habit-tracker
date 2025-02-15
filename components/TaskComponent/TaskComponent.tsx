import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Task = {
  id: string;
  text: string;
  points: string;
  completed: boolean;
};

const TaskItem = ({
  task,
  toggle,
}: {
  task: Task;
  toggle: (id: string) => void;
}) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggle(task.id)} style={styles.checkbox}>
        <Text>{task.completed ? '✅' : '⬜'}</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={task.completed ? styles.completed : styles.text}>
          {task.text}
        </Text>
        <Text style={task.completed ? styles.pointsCompleted : styles.points}>
          +{task.points} points
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: '#366B85',
  },
  checkbox: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  completed: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  pointsCompleted: {
    color: 'gray',
  },
  points: {
    fontSize: 14,
    color: '#D9D9D9',
  },
});

export default TaskItem;
