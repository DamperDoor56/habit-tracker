import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {X} from 'lucide-react-native';
import {AddHabitFormProps} from '../types/form';

export function AddHabitForm({
  onAdd,
  onCancel,
  initialValues,
  isEdit,
  existingHabit,
  onUpdate,
}: AddHabitFormProps) {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<'checklist' | 'timer'>('checklist');
  const [duration, setDuration] = useState<string>(
    initialValues?.duration ? String(initialValues.duration / 60) : '10',
  );
  const handleSubmit = () => {
    if (!name.trim()) return;

    const baseHabit = {
      name,
      type,
      ...(type === 'timer' && {duration: Number.parseInt(duration) * 60}),
    };

    if (existingHabit && onUpdate) {
      onUpdate({...existingHabit, ...baseHabit});
    } else if (onAdd) {
      onAdd(baseHabit);
    }
  };

  useEffect(() => {
    if (isEdit && existingHabit) {
      setName(existingHabit.name);
      setType(existingHabit.type);
      if (existingHabit.type === 'timer' && existingHabit.duration) {
        setDuration(String(existingHabit.duration / 60));
      }
    }
  }, [isEdit, existingHabit]);

  return (
    <Modal transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {isEdit ? 'Editar Hábito' : 'Nuevo Hábito'}
            </Text>

            <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
              <X size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nombre del hábito"
            />

            {/* Tipo de Hábito */}
            <Text style={styles.label}>Tipo</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  type === 'checklist' && styles.radioSelected,
                ]}
                onPress={() => setType('checklist')}>
                <Text
                  style={
                    (styles.radioText,
                    type === 'checklist' && styles.radioTextSelected)
                  }>
                  Checklist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  type === 'timer' && styles.radioSelected,
                ]}
                onPress={() => setType('timer')}>
                <Text
                  style={
                    (styles.radioText,
                    type === 'timer' && styles.radioTextSelected)
                  }>
                  Temporizador
                </Text>
              </TouchableOpacity>
            </View>

            {/* Duración (Solo si es tipo timer) */}
            {type === 'timer' && (
              <>
                <Text style={styles.label}>Duración (minutos)</Text>
                <Picker
                  selectedValue={duration}
                  onValueChange={setDuration}
                  style={styles.picker}>
                  <Picker.Item label="5 minutos" value="5" />
                  <Picker.Item label="10 minutos" value="10" />
                  <Picker.Item label="15 minutos" value="15" />
                  <Picker.Item label="20 minutos" value="20" />
                  <Picker.Item label="30 minutos" value="30" />
                  <Picker.Item label="45 minutos" value="45" />
                  <Picker.Item label="60 minutos" value="60" />
                </Picker>
              </>
            )}
          </View>

          {/* Botón Guardar */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>
              {isEdit ? 'Actualizar' : 'Guardar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  radioButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  radioSelected: {
    backgroundColor: '#669bbc',
  },
  radioText: {
    color: '#000',
  },
  radioTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  picker: {
    color: 'black',
    marginTop: 5,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#669bbc',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
