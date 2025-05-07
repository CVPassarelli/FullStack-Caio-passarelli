import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";
import { CreateTaskDTO } from "../validations/task.schema";
import { AppError } from "../errors/AppError";
import { ITask } from "../../../interfaces/task";

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
  return res.json(task);
};

export const createTask = async (
  req: Request<{}, {}, CreateTaskDTO>,
  res: Response
) => {
  const { title, description, completed = false, assigne } = req.body;

  const hasTask = await prisma.task.findFirst({ where: { title } });

  if (hasTask) {
    return res.status(400).json({
      message: "Already exists a task with this title",
    });
  }

  const newTask = await prisma.task.create({
    data: { title, description, completed, assigne },
  });

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
  return res.status(204).send();
};
