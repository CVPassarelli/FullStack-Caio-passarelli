import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title must containt at leat 3 characters"),
  description: z
    .string()
    .min(10, "Description must containt at leat 10 characters"),
  completed: z.boolean().optional(),
  assigne: z.string().min(1, "Assign is required"),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;
