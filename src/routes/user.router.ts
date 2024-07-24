import { Router } from "express";
import { getUsers, getUserById, getUserByUserName } from "../controllers/users.controller";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserById);
userRouter.get("/user", getUserByUserName);

export default userRouter;
