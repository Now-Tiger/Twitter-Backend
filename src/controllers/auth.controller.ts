import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient().user;

export const register = async (req: Request, res: Response) => {
  try {
    // username, email, password, confirmpass
    const { username, email, password } = req?.body;
    if (!username || !email || !!password) {
      res.status(400).json({ message: "Invalid Inputs" });
    }
    const user = await userClient.create({ data: { username: username, email: email, password: password }});
    res.status(201).json({ message: "User created sucessfully", link: `../api/v1/users/${user.id}` });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmpass } = req?.body;
    if (!email || !password || !confirmpass) {
      res.status(400).json({ message: "Invalid Inputs" });
    } else if (password !== confirmpass) {
      res.status(400).json({ message: "Password does not match!" });
    } else {
      const userToBeDeleted = await userClient.delete({ where: { email: email }});
      if (!userToBeDeleted) {
        res.status(404).json({ message: "User not found!" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    }
    res.status(400).json({ message: "Enter correct inputs!" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
