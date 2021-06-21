import debugWrapper from "debug";
import { Handler, NextFunction, Request, Response } from "express";

export const debug = debugWrapper('cloud-build-chat-notifications:server');

export const messageValidator: Handler = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    if (!body.message || !body.message.data) {
        return next(new Error('Not a valid message'));
    }
    next();
}