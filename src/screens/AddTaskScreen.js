import React from "react";
import { addTask, updateTask } from "../utils/storage";
import TaskForm from "../components/TaskForm";

const AddTaskScreen = ({ route, navigation }) => {
  const initialTask = route?.params?.task;

  const handleSubmit = async (task, isUpdate) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    if (isUpdate) {
        await updateTask(task.id, task)
        navigation.navigate("TaskDetail", {task});
    } else {
        await addTask(newTask);
        navigation.goBack();
    }
  };

  return <TaskForm onSubmit={handleSubmit} initialTask={initialTask} />;
};

export default AddTaskScreen;
