import React, { createContext, useState, useEffect, useContext } from 'react';

const API_BASE_URL = 'http://localhost:3001/tasks';

export const TasksContext = createContext({
  tasks: [],
  isLoading: false,
  fetchTasks: () => {},
  getTaskById: () => null,
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

export const useTasks = () => useContext(TasksContext);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Error getting task.');
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Erreur getting Tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); 

  const getTaskById = (id) => tasks.find(task => task.id.toString() === id.toString());

  const addTask = async (newTask) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const data = await response.json();

      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = (id, updatedTask) => console.log('Update:', id, updatedTask);
  const deleteTask = (id) => console.log('Delete:', id);
  
  const value = {
    tasks,
    isLoading,
    fetchTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}