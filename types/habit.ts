export type Habit = {
    id: number;
    name: string;
    type: 'checklist' | 'timer';
    completed: boolean;
    duration?: number; // Solo si el tipo es 'timer'
  };
  