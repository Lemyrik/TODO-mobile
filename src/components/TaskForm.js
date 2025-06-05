import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../styles/globalStyles';
import { validateTask } from '../utils/validators';

const TaskForm = ({ initialTask, onSubmit }) => {
  const [task, setTask] = useState(initialTask || {
    title: '',
    description: '',
    dateTime: new Date(),
    location: '',
    status: 'Pending',
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (name, value) => {
    setTask({ ...task, [name]: value });
// Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = () => {
    const validation = validateTask(task);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    onSubmit(task, true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('dateTime', selectedDate);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>
        {initialTask ? 'Edit Task' : 'Add New Task'}
      </Text>

      <TextInput
        style={[globalStyles.input, errors.title && { borderColor: 'red' }]}
        placeholder="Task Title"
        value={task.title}
        onChangeText={(text) => handleChange('title', text)}
      />
      {errors.title && <Text style={globalStyles.errorText}>{errors.title}</Text>}

      <TextInput
        style={[globalStyles.input, { height: 100 }, errors.description && { borderColor: 'red' }]}
        placeholder="Task Description (Optional)"
        multiline
        value={task.description}
        onChangeText={(text) => handleChange('description', text)}
      />
      {errors.description && <Text style={globalStyles.errorText}>{errors.description}</Text>}

      <TouchableOpacity
        style={[globalStyles.input, { justifyContent: 'center' }, errors.dateTime && { borderColor: 'red' }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>
          {task.dateTime.toLocaleString()}
        </Text>
      </TouchableOpacity>
      {errors.dateTime && <Text style={globalStyles.errorText}>{errors.dateTime}</Text>}

      {showDatePicker && (
        <DateTimePicker
          value={task.dateTime}
          mode="datetime"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      <TextInput
        style={[globalStyles.input, errors.location && { borderColor: 'red' }]}
        placeholder="Location (e.g., 123 Main St, City)"
        value={task.location}
        onChangeText={(text) => handleChange('location', text)}
      />
      {errors.location && <Text style={globalStyles.errorText}>{errors.location}</Text>}

      {initialTask && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <View style={styles.statusButtons}>
            {['Pending', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  task.status === status && styles.statusButtonActive,
                ]}
                onPress={() => handleChange('status', status)}
              >
                <Text style={task.status === status && styles.statusButtonTextActive}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <Button
        title={initialTask ? 'Update Task' : 'Add Task'}
        onPress={handleSubmit}
        color="#6200ee"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  statusButtonTextActive: {
    color: 'white',
  },
});

export default TaskForm;
