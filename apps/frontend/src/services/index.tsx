import { ITask, IUser } from "../../../interfaces/task";
import api from "./api";

export const getTasks = async (): Promise<ITask[]> => {
  const response = await api.get<ITask[]>("/task");
  return response.data;
};

export const getUsers = async (): Promise<IUser[]> => {
  const response = await api.get<IUser[]>("/user");
  return response.data;
};

export const createTask = async (
  task: Partial<ITask>
): Promise<Partial<ITask>> => {
  const response = await api.post<Partial<ITask>>("/task", task);
  return response.data;
};

export const updateTask = async (
  task: Partial<ITask>
): Promise<Partial<ITask>> => {
  const response = await api.put<Partial<ITask>>(`/task/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<Partial<ITask>> => {
  const response = await api.delete<Partial<ITask>>(`/task/${id}`);
  return response.data;
};
