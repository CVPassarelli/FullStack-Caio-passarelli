import { RequestHandler, Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  getTasksById,
  updateTask,
} from "../controller/task.controller";
import { validate } from "../middleware/validate";
import { createTaskSchema } from "../validations/task.schema";

const router = Router();

router.get("/task", getTasks as unknown as RequestHandler);

router.get("/task/:id", getTasksById as unknown as RequestHandler);

router.post(
  "/task",
  validate(createTaskSchema),
  createTask as unknown as RequestHandler
);

router.put(
  "/task/:id",
  validate(createTaskSchema),
  updateTask as unknown as RequestHandler
);

router.delete("/task/:id", deleteTask as unknown as RequestHandler);

export default router;
