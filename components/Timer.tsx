import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimerProps} from '../types/timer';

export function Timer({
  duration,
  active,
  onComplete,
  timeRemaining,
  setTimeRemaining,
  habitId,
}: TimerProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const habitTime = `timerEnd_${habitId}`;

  // Restore timer on init
  useEffect(() => {
    const restoreTimer = async () => {
      // Retrieve the end times using the habitTime based on habit id
      const storedEnd = await AsyncStorage.getItem(habitTime);
      if (storedEnd) {
        const end = parseInt(storedEnd, 10);
        const now = Date.now();
        const secondsLeft = Math.max(0, Math.floor((end - now) / 1000)); // Calculate how many seconds are left until the timer ends

        if (secondsLeft > 0) {
          // If there's still time left, update the endTimeRef
          endTimeRef.current = end;
          setTimeRemaining(secondsLeft);
        } else {
          await AsyncStorage.removeItem(habitTime);
          setTimeRemaining(0);
        }
      }
    };
    // Call the function when the component mounts or when the habitId changes
    restoreTimer();
  }, [habitId]);

  // Init timer if active
  useEffect(() => {
    const startTimer = async () => {
      // If the timer is active and there's time left
      if (active && timeRemaining > 0) {
        // Calculate the end timestamp by adding remaining time to current time
        const end = Date.now() + timeRemaining * 1000;
        endTimeRef.current = end; // Save the end time in a ref so we can reuse it
        await AsyncStorage.setItem(habitTime, end.toString()); // Store last time registered in async storage

        // Counts the time that remains when the phone is on doze mode
        intervalRef.current = setInterval(() => {
          const now = Date.now();
          // Calculate how many seconds are left until the end
          const secondsLeft = Math.max(Math.round((end - now) / 1000));
          setTimeRemaining(secondsLeft);
          if (secondsLeft <= 0) {
            // Clear the interval to stop counting
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
            }
            AsyncStorage.removeItem(habitTime);
            onComplete();
          }
        }, 1000);
      }
    };

    startTimer();

    // Stops the interval if the component unmounts
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [active, timeRemaining, habitId]);

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: 'bold',
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
