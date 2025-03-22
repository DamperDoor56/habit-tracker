import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Bar as ProgressBar} from 'react-native-progress';
import {TimerProps} from '../types/timer';

export function Timer({
  duration,
  active,
  onComplete,
  timeRemaining,
  setTimeRemaining,
}: TimerProps) {
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (active && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [active, timeRemaining, onComplete, setTimeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const progress = (duration - timeRemaining) / duration;

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>

      {Platform.OS === 'android' ? (
        <ProgressBar
          progress={progress}
          width={null}
          color="#6200ee"
          style={styles.progressBar}
        />
      ) : (
        <View style={styles.progressBarWrapper}>
          <View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
        </View>
      )}
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
    marginTop: 6,
  },
  progressBarWrapper: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#6200ee',
  },
});
