import axios from "axios";
import { Task } from "../types/Task";

const API_URL = "http://localhost:3000/api/tasks";

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  addTask: async (task: Omit<Task, "id" | "completed">): Promise<Task> => {
    const response = await axios.post(API_URL, task);
    return response.data.task;
  },

  updateTask: async (task: Task): Promise<Task> => {
    const response = await axios.put(`${API_URL}/${task.id}`, task);
    return response.data.task;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  completedTask: async (task: Task): Promise<Task> => {
    const updatedTask = {
      ...task,
      completed: true,
      priority: "",
    };
    const response = await axios.put(`${API_URL}/${task.id}`, updatedTask);
    return response.data.task;
  },
};
