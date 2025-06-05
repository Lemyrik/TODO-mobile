import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../styles/globalStyles';
import moment from 'moment';

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending':
      return [globalStyles.status, globalStyles.statusPending];
    case 'In Progress':
      return [globalStyles.status, globalStyles.statusInProgress];
    case 'Completed':
      return [globalStyles.status, globalStyles.statusCompleted];
    case 'Cancelled':
      return [globalStyles.status, globalStyles.statusCancelled];
    default:
      return [globalStyles.status];
  }
};

const TaskItem = ({ task, onPress, onDelete }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.date}>
          {moment(task.dateTime).format('MMM D, YYYY h:mm A')}
        </Text>
        <Text style={getStatusStyle(task.status)}>{task.status}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Icon name="delete" size={24} color="#f44336" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    marginLeft: 15,
  },
});

export default TaskItem;
