import { Handler, NextFunction, Request, Response } from "express";

export const GoogleCloudBuild: Handler = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    if (!body.message || !body.message.data) {
        return next(new Error('Not a valid message'));
    }
    next();
}