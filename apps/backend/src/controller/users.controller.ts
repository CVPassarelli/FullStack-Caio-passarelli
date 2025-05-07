import { Request, Response } from "express";
import { IUser } from "../../../interfaces/task";
import { userMock } from "../mocks/user.mock";

export const getUsers = async (_req: Request, res: Response<IUser[] | []>) => {
  const users: IUser[] = userMock;
  return res.json(users);
};
