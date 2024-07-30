import { Router } from "express";
import { getTweets } from "../controllers/tweets.controller";

const tweetsRouter = Router();

tweetsRouter.get("/tweets", getTweets);

export default tweetsRouter;
