import express, { NextFunction, Request, Response, Handler } from "express";
import {getValidator} from "./EventValidators";
import { clientMiddlewares } from "./clients";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(getValidator()); // apply message validator of required vendor
app.use(clientMiddlewares);
app.use(async (req: Request, res: Response, next: NextFunction) => {
    res.json({ title: "Cloud Build Chat Notifications", message: "Hello there!" });
});

export default app;
