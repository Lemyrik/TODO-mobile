import AsyncStorage from '@react-native-community/async-storage';

const TASKS_KEY = '@tasks';

export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading tasks', e);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving tasks', e);
  }
};
export const addTask = async (task) => {
  const tasks = await getTasks();
  tasks.push(task);
  await saveTasks(tasks);
  return tasks;
};

export const updateTask = async (id, updatedTask) => {
  const tasks = await getTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    await saveTasks(tasks);
  }
  return tasks;
};

export const deleteTask = async (id) => {
  const tasks = await getTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);
  await saveTasks(filteredTasks);
  return filteredTasks;
};
