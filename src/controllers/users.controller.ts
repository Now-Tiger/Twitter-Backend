import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const userclient = new PrismaClient().user;

/** GET list of users and their tweets */
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userclient.findMany({ select: { username: true, tweet: true }});
    if (!users) {
      res.status(404).json({ messsage: "Dataset is empty" });
    }
    res.status(200).json({ message: "List of users", data: { users: users } });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

/** GET user by id */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req?.params?.id);
    const found = await userclient.findUnique({
      where: { id: userId },
      select: { username: true, tweet: true, createdAt: true, updatedAt: true },
    });
    if (!found) {
      res.status(404).json({ message: "User not found!", links: "../api/v1/users" });
    }
    res.status(200).json({ message: "User found!", data: { user: found } });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

/** GET - search a user by it's username */
export const getUserByUserName = async (req: Request, res: Response) => {
  try {
    const username = req?.query?.username as string;
    if (!username) {
      res.status(400).json({ message: "Requires username" });
    }
    const user = await userclient.findUnique({ 
      where: { username: username },
      select: { username: true, tweet: true },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Found user", user: user });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

