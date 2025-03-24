
import {Habit} from './habit';

export interface HabitCardProps {
      habit: Habit;
    onToggleComplete: () => void;
    onEditHabit: () => void;
    onDeleteHabit: () => void;
  };
  