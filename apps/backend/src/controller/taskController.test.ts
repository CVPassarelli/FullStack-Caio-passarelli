import { Request, Response, NextFunction } from "express";
import {
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
} from "./task.controller";
import { prisma } from "../../src/prisma/client";

jest.mock("../../src/prisma/client", () => ({
  prisma: {
    task: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("Task Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("getTasks deve retornar todas as tasks", async () => {
    const mockTasks = [
      {
        id: 1,
        title: "Teste",
        assigne: "User",
        completed: false,
        description: null,
      },
    ];
    (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

    const res = mockResponse();
    await getTasks({} as Request, res);

    expect(prisma.task.findMany).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  it("getTasksById deve retornar uma task específica", async () => {
    const mockTask = {
      id: 1,
      title: "Teste",
      assigne: "User",
      completed: false,
      description: null,
    };
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();
    const next = jest.fn();

    (prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);

    await getTasksById(req, res, next);

    expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.json).toHaveBeenCalledWith(mockTask);
  });

  it("createTask deve criar uma nova task", async () => {
    const req = {
      body: {
        title: "Nova",
        assigne: "User",
        completed: false,
        description: null,
      },
    } as Request;
    const res = mockResponse();

    (prisma.task.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.task.create as jest.Mock).mockResolvedValue(req.body);

    await createTask(req, res);

    expect(prisma.task.findFirst).toHaveBeenCalledWith({
      where: { title: "Nova" },
    });
    expect(prisma.task.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it("updateTask deve atualizar uma task existente", async () => {
    const req = {
      params: { id: "1" },
      body: {
        title: "Atualizada",
        description: "desc",
        completed: true,
        assign: "Tester",
      },
    } as unknown as Request;
    const res = mockResponse();
    const next = jest.fn();

    (prisma.task.findUnique as jest.Mock).mockResolvedValue(true);
    (prisma.task.update as jest.Mock).mockResolvedValue(req.body);

    await updateTask(req, res, next);

    expect(prisma.task.update).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it("deleteTask deve excluir uma task existente", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();
    const next = jest.fn();

    (prisma.task.findUnique as jest.Mock).mockResolvedValue(true);
    (prisma.task.delete as jest.Mock).mockResolvedValue({});

    await deleteTask(req, res, next);

    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
