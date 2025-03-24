import {Habit} from './habit';

export interface AddHabitFormProps {
    onAdd: (habit: Omit<Habit, "id" | "completed">) => void;
    onCancel: () => void;
  }