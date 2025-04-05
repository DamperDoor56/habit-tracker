import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
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
  points,
}: HabitCardProps) {
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(
    habit.duration || 0,
  );

  const handleTimerComplete = () => {
    setTimerActive(false);
    onToggleComplete();
  };

  const handleTimerStart = () => {
    setTimerActive(true);
  };

  const handleTimerStop = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimeRemaining(habit.duration ?? 0); // Usa 0 si duration es undefined
    setTimerActive(false);
  };

  return (
    <View style={[styles.card, habit.completed && styles.completedCard]}>
      <View style={styles.content}>
        {habit.type === 'checklist' ? (
          <View style={styles.upper}>
            <TouchableOpacity onPress={onToggleComplete}>
              {habit.completed ? (
                <CheckSquare size={24} color="#023047" />
              ) : (
                <Square onPress={onToggleComplete} size={24} color="#aaa" />
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
                <Text style={styles.infoText}>Puntos: {points}</Text>
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
                <Text style={styles.infoText}>Puntos: {points}</Text>
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
                        onPress={handleTimerStart}>
                        <Text style={styles.buttonText}>Iniciar</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[styles.button, styles.outlineButton]}
                        onPress={handleTimerStop}>
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
