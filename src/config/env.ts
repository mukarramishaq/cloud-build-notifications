import { config } from "dotenv";
import { TransportOptions } from "nodemailer";
config();

export const PROJECT_NAME = process.env.PROJECT_NAME;
export const MESSAGE_SUBTITLE = process.env.MESSAGE_SUBTITLE;

/**
 * Google Chat Room Credetials
 */
export const GOOGLE_CHAT_ROOM_WEBHOOK = process.env.GOOGLE_CHAT_ROOM_WEBHOOK;

/**
 * Sender and recipients email addresses and their names
 */
export const EMAIL_USERS = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    cc: process.env.EMAIL_CC,
    bcc: process.env.EMAIL_BCC,
};

/**
 * SMTP Credentials
 */
export const SMTP_CREDENTIALS = {
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    auth: {
        type: process.env.SMTP_AUTH_TYPE,
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_LOGIN_PASS,
        method: process.env.SMTP_AUTH_CUSTOM_METHOD,
        clientId: process.env.SMTP_AUTH_OAUTH2_CLIENT_ID,
        clientSecret: process.env.SMTP_AUTH_OAUTH2_CLIENT_SECRET,
        refreshToken: process.env.SMTP_AUTH_OAUTH2_REFRESH_TOKEN,
    },
};
