import { Router } from "express";
import {
  getUsers,
  getUserById,
  getUserByName,
} from "../controllers/users.controller";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserById);
userRouter.get("/users");

export default userRouter;
