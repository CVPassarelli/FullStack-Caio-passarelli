import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";
import { ITaskSchema } from "../../../interfaces/schema/task.schema";
import { AppError } from "../errors/AppError";
import { ITask } from "../../../interfaces/task";
import { broadcastTasks } from "../websocket";

export const getTasks = async (_req: Request, res: Response<ITask[] | []>) => {
  const tasks: ITask[] | [] = await prisma.task.findMany();
  return res.json(tasks);
};

export const getTasksById = async (
  req: Request,
  res: Response<ITask | null>,
  next: NextFunction
) => {
  const { id } = req.params;
  const task: ITask | null = await prisma.task.findUnique({
    where: { id: Number(id) },
  });
  if (!task) return next(new AppError("Task not found", 404));
  await broadcastTasks();
  return res.json(task);
};

export const createTask = async (
  req: Request<{}, {}, ITaskSchema>,
  res: Response,
  next: NextFunction
) => {
  const { title, description, completed = false, assigne } = req.body;

  const hasTask = await prisma.task.findFirst({ where: { title } });

  if (hasTask) {
    return next(new AppError("Already exists a task with this title", 400));
  }

  const newTask = await prisma.task.create({
    data: { title, description, completed, assigne },
  });
  await broadcastTasks();
  return res.status(201).json(newTask);
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const exists = await prisma.task.findUnique({ where: { id: Number(id) } });
  if (!exists) return next(new AppError("Task not found", 404));

  const updated = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, description, completed },
  });
  await broadcastTasks();
  return res.json(updated);
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const exists = await prisma.task.findUnique({ where: { id: Number(id) } });
  if (!exists) return next(new AppError("Task not found", 404));

  await prisma.task.delete({ where: { id: Number(id) } });
  await broadcastTasks();
  return res.status(204).send();
};
