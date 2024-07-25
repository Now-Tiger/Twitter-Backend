import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const tweetsClent = new PrismaClient().tweet;

export const getTweets = async (_req: Request, res: Response) => {
  try {
    const tweets = await tweetsClent.findMany({select: { authorId: true, content: true }});
    if (!tweets) {
      res.status(404).json({ message: "Empty Database!" });
    }
    res.status(200).json({ message: "Found tweets", tweets: tweets });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
