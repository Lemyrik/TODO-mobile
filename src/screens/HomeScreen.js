import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTasks, deleteTask } from '../utils/storage';
import TaskItem from '../components/TaskItem';
import SortButton from '../components/SortButton';
import { globalStyles } from '../styles/globalStyles';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('dateAdded');
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    };

    loadTasks();
    
    // Refresh tasks when screen is focused
    const unsubscribe = navigation.addListener('focus', loadTasks);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id) => {
    const updatedTasks = await deleteTask(id);
    setTasks(updatedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'dateAdded') {
      return sortAsc 
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      // Sort by status (custom order)
      const statusOrder = { 'Pending': 0, 'In Progress': 1, 'Completed': 2, 'Cancelled': 3 };
      return sortAsc
        ? statusOrder[a.status] - statusOrder[b.status]
        : statusOrder[b.status] - statusOrder[a.status];
    }
  });

  return (
    <View style={globalStyles.container}>
      <SortButton 
        sortBy={sortBy}
        sortAsc={sortAsc}
        onSortChange={(by, asc) => {
          setSortBy(by);
          setSortAsc(asc);
        }}
      />

      <FlatList
        style={globalStyles.taskList}
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => navigation.navigate('TaskDetail', { task: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />

      <FAB
        style={globalStyles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddTask')}
        color="white"
      />
    </View>
  );
};

export default HomeScreen;
