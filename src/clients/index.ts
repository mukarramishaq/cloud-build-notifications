import { NextFunction, Request, Response } from "express";
import GoogleChatRoomClient from "./GoogleChatRoom/GoogleChatRoomClient";

/**
 * Register your clients here
 */
const clients = [
    GoogleChatRoomClient
];


const getClientHandlers = () => {
    return clients.map((client) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            if (client.validate(req) === true) {
                const ob = new client();
                await ob.handle(req).catch(console.error);
            }
            next();
        }
    });
}

export const clientMiddlewares = getClientHandlers();