import { Request, Response } from "express";
import { getUsers } from "./users.controller";
import { userMock } from "../mocks/user.mock";

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

  it("getUsers should return a list of users", async () => {
    const res = mockResponse();
    await getUsers({} as Request, res);

    expect(res.json).toHaveBeenCalledWith(userMock);
  });
});
