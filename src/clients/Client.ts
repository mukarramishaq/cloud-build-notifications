import { Request } from "express";

export class Client<IncomingMessageType> {

    protected message: IncomingMessageType;

    /**
     * this will check whether the
     * incoming message is for this
     * client or not. if the incoming message
     * is for this client it must return true
     * otherwise false.
     *
     * @param {Request} req
     * @return {Boolean}
     */
    static validate(req: Request): boolean {
        // override to implement your own logic
        return true;
    }

    /**
     * this will handle the incoming message on successful
     * validation only and will process the message
     * @param {Request} req
     */
    async handle(req: Request) {
        // override to implement your own logic
    }
}