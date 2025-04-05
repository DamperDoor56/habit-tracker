import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {TimerProps} from '../types/timer';

export function Timer({
  duration,
  active,
  onComplete,
  timeRemaining,
  setTimeRemaining,
}: TimerProps) {
  useEffect(() => {
    let intervalId: number;

    if (active && timeRemaining > 0) {
      intervalId = BackgroundTimer.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            BackgroundTimer.clearInterval(intervalId);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        BackgroundTimer.clearInterval(intervalId);
      }
    };
  }, [active, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  timerText: {
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
  },
  progressBarWrapper: {
    backgroundColor: '#669bbc',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: 10,
    backgroundColor: '#669bbc',
  },
});
