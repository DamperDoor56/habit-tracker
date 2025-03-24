import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import {EllipsisVertical, Pencil, Trash2} from 'lucide-react-native';
import {HabitOptionsProps} from '../types/habit-options';

export const HabitOptions = ({onEdit, onDelete}: HabitOptionsProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <EllipsisVertical size={20} color="#333" />
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.backdrop}
          onPress={() => setModalVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                onEdit();
              }}>
              <View style={styles.option}>
                <Text style={styles.optionText}>Editar</Text>
                <Pencil />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                onDelete();
              }}>
              <View style={styles.option}>
                <Text style={styles.optionText}>Eliminar</Text>
                <Trash2 />
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 200,
    gap: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
