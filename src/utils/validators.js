export const validateTask = (task) => {
  const errors = {};
  
  if (!task.title || task.title.trim() === '') {
    errors.title = 'Task title is required';
  } else if (task.title.length > 100) {
    errors.title = 'Title cannot exceed 100 characters';
  }
  
  if (task.description && task.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }
  
  /* if (!task.dateTime) {
    errors.dateTime = 'Date and time are required';
  } else if (new Date(task.dateTime) < new Date()) {
    errors.dateTime = 'Date and time cannot be in the past';
  } */
  
  if (!task.location || task.location.trim() === '') {
    errors.location = 'Location is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
