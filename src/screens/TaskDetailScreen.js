import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { updateTask } from '../utils/storage';
import { globalStyles } from '../styles/globalStyles';
import moment from 'moment';

const TaskDetailScreen = ({ route, navigation }) => {
  const { task: initialTask } = route.params;
  const [task, setTask] = useState(initialTask);

  const handleStatusUpdate = async (newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    await updateTask(task.id, { status: newStatus });
    setTask(updatedTask);
  };

  const handleEdit = () => {
    navigation.navigate('AddTask', { task });
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={[styles.status, globalStyles[`status${task.status.replace(' ', '')}`]]}>
          {task.status}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.sectionContent}>
          {task.description || 'No description provided'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date & Time</Text>
        <Text style={styles.sectionContent}>
          {moment(task.dateTime).format('MMMM D, YYYY h:mm A')}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.sectionContent}>{task.location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Status</Text>
        <View style={styles.statusButtons}>
          {['In Progress', 'Completed', 'Cancelled'].map((status) => (
            <Button
              key={status}
              mode="contained"
              style={styles.statusButton}
              onPress={() => handleStatusUpdate(status)}
              disabled={task.status === status}
            >
              {status}
            </Button>
          ))}
        </View>
      </View>

      <Button
        mode="contained"
        style={styles.editButton}
        onPress={handleEdit}
        icon={() => <Icon name="edit" size={20} color="white" />}
      >
        Edit Task
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    padding: 5,
    borderRadius: 4,
    alignSelf: 'flex-start',
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6200ee',
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statusButton: {
    marginVertical: 5,
    width: '48%',
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#6200ee',
  },
});

export default TaskDetailScreen;

