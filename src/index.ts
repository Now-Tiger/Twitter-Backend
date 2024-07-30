import express, { Request, Response } from "express";
import cors from "cors";

import userRouter from "./routes/user.router";
import tweetsRouter from "./routes/tweets.router";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({ credentials: true, origin: `http://localhost:${port}` }));

app.use("/api/v1", userRouter);
app.use("/api/v1", tweetsRouter);

app.get("/", (_req: Request, res: Response) =>
  res.status(200).json({ message: "Welcome back Neo!" }),
);

app.use("*", (_req: Request, res: Response) =>
  res.status(400).json({ message: "Bad Request!" }),
);

app.listen(port, () => {
  console.log(`Application started @ http://localhost:${port}`);
});
