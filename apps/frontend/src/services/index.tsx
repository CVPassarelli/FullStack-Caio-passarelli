import { ITask } from "../../../interfaces/task";
import api from "./api";

export const getTasks = async (): Promise<ITask[]> => {
  const response = await api.get<ITask[]>("/task");
  return response.data;
};
