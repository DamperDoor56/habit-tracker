import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {CheckCircle, Clock, Award} from 'lucide-react-native';
import {Timer} from './Timer';
import {HabitCardProps} from '../types/habit-cart';
import {CheckSquare, Square} from 'lucide-react-native';
import {HabitOptions} from './HabitOptions';

export function HabitCard({
  habit,
  onToggleComplete,
  onEditHabit,
  onDeleteHabit,
  animatedHabitId,
}: HabitCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity animation
  const translateYAnim = useRef(new Animated.Value(10)).current;
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(
    habit.duration || 0,
  );

  // Handle animation when a habit is to be completed
  useEffect(() => {
    if (animatedHabitId === habit.id && habit.completed) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.delay(500),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.delay(500),
          Animated.timing(translateYAnim, {
            toValue: -10,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [habit.completed, animatedHabitId]);

  const handleTimerComplete = () => {
    setTimerActive(false);
    onToggleComplete();
  };

  const resetTimer = () => {
    setTimeRemaining(habit.duration ?? 0); // Use 0 if duration it's undefined
    setTimerActive(false);
  };

  return (
    <View style={[styles.card, habit.completed && styles.completedCard]}>
      <View style={styles.content}>
        {habit.type === 'checklist' ? (
          <View style={styles.upper}>
            <Animated.View
              style={{
                position: 'absolute',
                opacity: fadeAnim,
                transform: [{translateY: translateYAnim}],
              }}>
              <Text style={styles.animations}>+ {habit.points}</Text>
            </Animated.View>
            <TouchableOpacity onPress={onToggleComplete}>
              {habit.completed ? (
                <CheckSquare size={24} color="#023047" />
              ) : (
                <Square size={24} color="#aaa" />
              )}
            </TouchableOpacity>
            <View>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.habitName,
                    habit.completed && styles.completedText,
                  ]}>
                  {habit.name}
                </Text>
                <HabitOptions
                  onEdit={() => onEditHabit()}
                  onDelete={() => onDeleteHabit()}
                />
              </View>
              <View style={styles.infoRow}>
                <CheckCircle size={14} color="#888" />
                <Text style={styles.infoText}>Checklist</Text>
              </View>
              <View style={styles.infoRow}>
                <Award size={14} color="#888" />
                <Text style={styles.infoText}>Puntos: {habit.points}</Text>
              </View>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.timer}>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.habitName,
                    habit.completed && styles.completedText,
                  ]}>
                  {habit.name}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <View style={styles.infoRow}>
                  <Clock size={14} color="#888" />
                  <Text style={styles.infoText}>
                    Temporizador: {Math.floor((habit.duration ?? 0) / 60)}{' '}
                    minutos
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <HabitOptions
                    onEdit={() => onEditHabit()}
                    onDelete={() => onDeleteHabit()}
                  />
                </View>
              </View>
              <View style={styles.infoRow}>
                <Award size={14} color="#888" />
                <Text style={styles.infoText}>Puntos: {habit.points}</Text>
              </View>
              {!habit.completed && (
                <View style={styles.timerContainer}>
                  <Timer
                    duration={habit.duration ?? 0}
                    active={timerActive}
                    onComplete={handleTimerComplete}
                    timeRemaining={timeRemaining}
                    setTimeRemaining={setTimeRemaining}
                  />

                  <View style={styles.buttonRow}>
                    {!timerActive ? (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => setTimerActive(true)}>
                        <Text style={styles.buttonText}>Iniciar</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[styles.button, styles.outlineButton]}
                        onPress={() => setTimerActive(false)}>
                        <Text style={styles.outlineButtonText}>Pausar</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={[styles.button, styles.outlineButton]}
                      onPress={resetTimer}>
                      <Text style={styles.outlineButtonText}>Reiniciar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  upper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    flexDirection: 'row',
  },
  timer: {
    width: '100%',
  },
  completedCard: {
    backgroundColor: '#ccd5ae',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  animations: {
    position: 'absolute',
    fontSize: 24,
    left: 120,
    color: '#00aa00',
    fontWeight: 'bold',
  },
  textContainer: {
    display: 'flex',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#888',
  },
  timerContainer: {
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#669bbc',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  outlineButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#669bbc',
  },
  outlineButtonText: {
    color: '#669bbc',
    fontWeight: 'bold',
  },
});
