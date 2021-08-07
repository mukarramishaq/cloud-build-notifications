import { NextFunction, Request, Response } from "express";
import { GoogleChatRoomClient } from "./GoogleChatRoom/GoogleChatRoomClient";
import { SMTPClient } from "./Mail/SMTPClient";
import { Client } from "./Client";
/**
 * Register your clients here
 */
const clients: Client[] = [new GoogleChatRoomClient(), new SMTPClient()];

const getClientHandlers = () => {
    return clients.map((client) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            if (client.isActive() && client.validate(req) === true) {
                await client.handle(req).catch(console.error);
            }
            next();
        };
    });
};

export const clientMiddlewares = getClientHandlers();
