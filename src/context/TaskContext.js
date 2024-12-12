import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const removeTask = id => {
    const filtred = tasks.filter(task => task.id !== id);
    setTasks(filtred);
    Alert.alert('Task silindi');
  };

  const addTask = title => {
    const newTask = {
      userId: 1,
      id: Date.now(),
      title,
    };
    setTasks([...tasks, newTask]);
    Alert.alert('Yeni task eklendi');
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        removeTask,
        newTaskTitle,
        setNewTaskTitle,
        addTask,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
