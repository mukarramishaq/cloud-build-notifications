import { config } from "dotenv";
config();

export const GOOGLE_CHAT_ROOM_WEBHOOK = process.env.GOOGLE_CHAT_ROOM_WEBHOOK;
export const PROJECT_NAME = process.env.PROJECT_NAME;
export const PROJECT_LOGO_URL = process.env.PROJECT_LOGO_URL;
export const MESSAGE_SUBTITLE = process.env.MESSAGE_SUBTITLE;