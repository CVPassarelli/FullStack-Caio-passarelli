import { RequestHandler, Router } from "express";
import { getUsers } from "../controller/users.controller";

const router = Router();

router.get("/user", getUsers as unknown as RequestHandler);

export default router;
