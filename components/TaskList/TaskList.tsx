import React, {useState} from 'react';
import {ScrollView, View, SafeAreaView, StyleSheet} from 'react-native';
import TaskItem from '../TaskComponent/TaskComponent';

type Task = {
  id: string;
  text: string;
  points: string;
  completed: boolean;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {id: '1', text: 'Read a book', points: '10', completed: false},
    {id: '2', text: 'Exercise', points: '20', completed: false},
    {
      id: '3',
      text: 'Complete React Native App',
      points: '50',
      completed: false,
    },
    {
      id: '4',
      text: 'Complete React Native App',
      points: '50',
      completed: false,
    },
    {
      id: '5',
      text: 'Complete React Native App',
      points: '50',
      completed: false,
    },
    {
      id: '6',
      text: 'Complete React Native App',
      points: '50',
      completed: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} toggle={handleToggle} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TaskList;
