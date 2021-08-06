import { Client } from "../Client";
import { MessageType } from "../types";
import {
    PROJECT_NAME,
    MESSAGE_SUBTITLE,
    SMTP_CONNECTION_URI,
} from "../../config/env";
import nodemailer, { SentMessageInfo } from "nodemailer";

export class MailClient extends Client {
    protected transporter: nodemailer.Transporter<SentMessageInfo>;

    constructor() {
        super();
        this.transporter = nodemailer.createTransport(SMTP_CONNECTION_URI);
    }

    async send() {
        return await this.transporter.sendMail({
            from: "Mukarram Ishaq <mukarram.ishaq@rolustech.net>",
            to: "MKDEBUG <mukarramishaq189@gmail.com>",
            subject: `CICD | ${this.repoName} | ${this.branchName} | ${this.status}`,
            text: `Hello there`,
        });
    }

    public isActive() {
        return !!SMTP_CONNECTION_URI;
    }
}
