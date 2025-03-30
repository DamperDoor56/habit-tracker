
import {Habit} from './habit';

export interface HabitListProps {
    habits: Habit[];
    handleEditHabit:(Habit: Habit) => void;
    toggleComplete: (habitId: number) => void; // Se pasa el ID del hábito
  }
  
