import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const userclient = new PrismaClient().user;

// USER BASIC CRUD OPERATION

/** TODO:
 * 1. GET - list of all getUsers
 * 2. GET - a user by id
 * 3. POST - create user - insert data in db using prisma
 * 4. PUT - update user by id
 * 5. DELETE - delete user - get password and email then delete
 */

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userclient.findMany({
      select: {
        username: true,
        tweet: true,
      },
    });
    if (!users) {
      res.status(404).json({ messsage: "Dataset is empty" });
    }
    res.status(200).json({ message: "List of users", data: { users: users } });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req?.params?.id);
    const found = await userclient.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        tweet: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!found) {
      res
        .status(404)
        .json({ message: "User not found!", links: "../api/v1/users" });
    }
    res.status(200).json({ message: "User found!", data: { user: found } });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getUserByName = async (req: Request, res: Response) => {
  try {
    // fix below
    const username = req?.query?.name;
    if (!username) {
      res.status(400).json({ message: "Requires username" });
    }
    const user = await userclient.findUnique({
      where: {
        username: username as string,
      },
    });
    res.status(200).json({ message: "Found user", user: user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
