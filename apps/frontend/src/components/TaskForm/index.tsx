import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITask, IUser } from "../../../../interfaces/task";
import { z } from "zod";
import { createTask, deleteTask, updateTask } from "../../services";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must contain at least 3 characters"),
  description: z
    .string()
    .min(10, "Description must contain at least 10 characters"),
  completed: z.boolean().optional(),
  assigne: z.string().min(1, "Assignee is required"),
});

export type ITaskSchema = z.infer<typeof taskSchema>;

interface TaskFormProps {
  isEditing: boolean;
  initialValues?: Partial<ITask>;
  assigneUsers: IUser[];
  onClose: () => void;
  onSuccess: () => void;
  onError: () => void;
}

export const TaskForm = ({
  isEditing,
  initialValues,
  assigneUsers,
  onClose,
  onSuccess,
  onError,
}: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ITaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      assigne: "",
      description: "",
      completed: false,
    },
  });

  useEffect(() => {
    if (initialValues) {
      setValue("title", initialValues.title ?? "");
      setValue("assigne", initialValues.assigne ?? "");
      setValue("description", initialValues.description ?? "");
      setValue("completed", initialValues.completed ?? false);
    }
  }, [initialValues, setValue]);

  const onSubmit = async (data: ITaskSchema) => {
    try {
      if (isEditing && initialValues?.id) {
        await updateTask({ ...data, id: initialValues.id });
      } else {
        await createTask(data);
      }
      onSuccess();
      onClose();
    } catch (err) {
      onError();
    }
  };

  const onDelete = async () => {
    try {
      await deleteTask(initialValues!.id ?? 0);

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <select
          {...register("assigne")}
          className="w-full border p-2 rounded"
          defaultValue="">
          <option value="" disabled>
            Select an assignee
          </option>
          {assigneUsers.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.assigne && (
          <p className="text-red-500">{errors.assigne.message}</p>
        )}
      </div>
      <div>
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("completed")} />
        Done
      </label>
      <div className="flex justify-end gap-2">
        {isEditing && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-300 px-3 py-1 rounded">
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-3 py-1 rounded">
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded">
          {isEditing ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
};
