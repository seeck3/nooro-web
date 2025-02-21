import { Task } from "@/app/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const fetchTasks = async () => {
  try {
    const res = await axios.get(`${API_URL}/tasks`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all tasks:", error);
  }
};

export const fetchTask = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/tasks/${id}`);
    return res.data;
  } catch (error) {
      console.error("Error fetching a task by id:", error);
      if(axios.isAxiosError(error)){
          throw error?.response?.data.error
      }
  }
};

export const saveTask = async (task?: Task) => {
  try {
    if (task?.id) {
      return axios.put(`${API_URL}/tasks/${task.id}`, task);
    } else {
      return axios.post(`${API_URL}/tasks`, task);
    }
  } catch (error) {
    console.error("Error saving a task:", error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    return axios.delete(`${API_URL}/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting a task:", error);
  }
};
