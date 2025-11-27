import React, { createContext, useState, useEffect, useContext } from 'react';

const API_BASE_URL = 'http://localhost:3001/tasks';

export const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const getTaskById = (id) => tasks.find(t => t.id.toString() === id.toString());

  const addTask = async (newTask) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (err) {
      console.error("Erreur d'ajout:", err);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
    } catch (err) {
      console.error("Erreur de modification:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error("Erreur de suppression:", err);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, isLoading, addTask, updateTask, deleteTask, getTaskById }}>
      {children}
    </TasksContext.Provider>
  );
}