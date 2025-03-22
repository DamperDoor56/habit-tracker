
import {Habit} from './habit';

export interface HabitListProps {
    habits: Habit[];
    toggleComplete: (habitId: number) => void; // Se pasa el ID del hábito
  }
  
