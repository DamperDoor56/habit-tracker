
export interface TimerProps {
  duration: number;
  active: boolean;
  onComplete: () => void;
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
}
