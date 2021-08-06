import { config } from "dotenv";
config();

export const GOOGLE_CHAT_ROOM_WEBHOOK = process.env.GOOGLE_CHAT_ROOM_WEBHOOK;
export const SMTP_CONNECTION_URI = process.env.SMTP_CONNECTION_URI;

export const PROJECT_NAME = process.env.PROJECT_NAME;
export const MESSAGE_SUBTITLE = process.env.MESSAGE_SUBTITLE;
