import express, { NextFunction, Request, Response } from "express";
import { clientMiddlewares } from "./clients";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(clientMiddlewares);
app.use(async (req: Request, res: Response, next: NextFunction) => {
    res.json({ title: "Cloud Build Chat Notifications", message: "Hello there!" });
});

export default app;
