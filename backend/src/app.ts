import express, { Request, Response } from "express";
import { router } from "./app/routes";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Nebula!",
  });
});

app.use("/api/v1", router);

export default app;
