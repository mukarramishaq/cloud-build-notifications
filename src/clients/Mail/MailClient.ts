import { Client } from "../Client";
import { MessageType } from "../types";
import {
    PROJECT_NAME,
    MESSAGE_SUBTITLE,
    SMTP_CREDENTIALS,
} from "../../config/env";
import nodemailer, { SentMessageInfo } from "nodemailer";

export class MailClient extends Client {
    protected transporter: nodemailer.Transporter<SentMessageInfo>;
    constructor() {
        super();
        this.transporter = nodemailer.createTransport(SMTP_CREDENTIALS as any);
    }

    async send() {
        return await this.transporter.sendMail({
            from: "Mukarram Ishaq Jutt <mukarramishaq190@gmail.com>",
            to: "MKDEBUG <mukarramishaq189@gmail.com>",
            subject: `CICD | ${this.repoName} | ${this.branchName} | ${this.status}`,
            text: `Hello there`,
        });
    }

    public isActive() {
        return (
            !!SMTP_CREDENTIALS &&
            !!SMTP_CREDENTIALS.host &&
            !!SMTP_CREDENTIALS.port
        );
    }
}
