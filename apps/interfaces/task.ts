export interface ITask {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  assigne: string;
}

export interface IUser {
  id: number;
  name: string;
}

export interface IStatusRequest {
  message?: string;
  statusCode?: number;
  showToast?: boolean;
}
