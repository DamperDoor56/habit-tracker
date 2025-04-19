
export interface TimerProps {
  duration: number;
  active: boolean;
  habitId: number;
  onComplete: () => void;
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
}
