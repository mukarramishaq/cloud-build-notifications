import { Request } from "express";
import { Client } from "../Client";
import { BuildResourceType, MessageType, Status, StatusIcon } from "./types";
import fetch from "node-fetch";
import {
    GOOGLE_CHAT_ROOM_WEBHOOK,
    PROJECT_LOGO_URL,
    PROJECT_NAME,
    INSTANCE_NAME
} from "../../config/env";
class GoogleChatRoomClient extends Client<MessageType> {

    protected repoName: string;
    protected branchName: string;
    protected logUrl: string;
    protected status: Status;
    protected buildResource: BuildResourceType


    /**
     * @inheritdoc
     * @param {Request} req
     */
    static validate(req: Request): boolean {
        const body = req.body;
        if (!body.message || !body.message.data) {
            return false;
        }
        return true;
    }

    /**
     * @inheritdoc
     * @param {Request} req
     */
    async handle(req: Request) {
        this.message = req.body;
        this.processMessage();
        this.sendMessage();
    }

    protected processMessage() {
        this.buildResource = JSON.parse(Buffer.from(this.message.message.data, 'base64').toString());
        this.repoName = this.buildResource.substitutions.REPO_NAME;
        this.branchName = this.buildResource.substitutions.BRANCH_NAME;
        this.status = this.buildResource.status;
        this.logUrl = this.buildResource.logUrl;
    }

    protected getProjectName() {
        return PROJECT_NAME || this.repoName;
    }

    protected getInstanceName() {
        return INSTANCE_NAME || this.branchName;
    }

    protected getIconUrl() {
        return StatusIcon[this.status];
    }
    protected getProjectLogUrl() {
        return PROJECT_LOGO_URL;
    }

    protected async sendMessage() {
        const body = this.createMessageBody();
        await fetch(GOOGLE_CHAT_ROOM_WEBHOOK, {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then(data => console.log("MKDEBUG: ", data)).catch(e => console.error(`Error while send message to Google Chat: `, e));
    }

    protected createMessageBody() {
        return {
            cards: [
                {
                    header: {
                        title: this.getProjectName(),
                        subtitle: this.getInstanceName(),
                        imageUrl: this.getProjectLogUrl()
                    },
                    sections: [
                        {
                            widgets: [
                                {
                                    keyValue: {
                                        topLabel: "Status",
                                        content: this.status,
                                        iconUrl: this.getIconUrl(),
                                        button: {
                                            textButton: {
                                                text: "Open Logs",
                                                onClick: {
                                                    openLink: {
                                                        url: this.logUrl
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            widgets: [
                                {
                                    textParagraph: {
                                        text: "<font color='#B3B3B3'>made with sheer <font color=\"#ff0000\"><b>&hearts;<b></font> <font color='#B3B3B3'>by <a href='https://github.com/mukarramishaq'>MKDEBUG</a></font>"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

}


export default GoogleChatRoomClient;