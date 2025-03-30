import {Habit} from './habit';

export interface AddHabitFormProps {
    onAdd?: (habit: Omit<Habit, "id" | "completed">) => void;
    onCancel: () => void;
    initialValues?: {
      name: string;
      type: 'checklist' | 'timer';
      duration?: number; // en segundos
    };
    onUpdate?: (updatedHabit: Habit) => void;
    existingHabit?: Habit;
    isEdit?: boolean;

  }
