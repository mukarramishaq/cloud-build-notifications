import { Request } from "express";
import { Client } from "../Client";
import { BuildResourceType, MessageType, Status, StatusIcon } from "./types";
import fetch from "node-fetch";
import {
    GOOGLE_CHAT_ROOM_WEBHOOK,
    PROJECT_LOGO_URL,
    PROJECT_NAME,
    MESSAGE_SUBTITLE
} from "../../config/env";
import formatDistance from "date-fns/formatDistance";
class GoogleChatRoomClient extends Client<MessageType> {

    protected repoName: string;
    protected branchName: string;
    protected shortSHA: string;
    protected commitSHA: string;
    protected revision: string;
    protected trigger: string;
    protected logUrl: string;
    protected status: Status;
    protected startAt: Date;
    protected endAt: Date;
    protected timeSpan: string;
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
        this.shortSHA = this.buildResource.substitutions.SHORT_SHA;
        this.commitSHA = this.buildResource.substitutions.COMMIT_SHA;
        this.revision = this.buildResource.substitutions.REVISION_ID;
        this.trigger = this.buildResource.substitutions.TRIGGER_NAME;
        this.startAt = new Date(this.buildResource.startTime);
        this.endAt = this.buildResource.finishTime && new Date(this.buildResource.finishTime);
        this.timeSpan = formatDistance(this.endAt || new Date(), this.startAt, { includeSeconds: true });
        this.status = this.buildResource.status;
        this.logUrl = this.buildResource.logUrl;
    }

    protected getTitle() {
        return `${this.repoName}  >>  ${this.branchName}`;
    }

    protected getSubtitle() {
        return MESSAGE_SUBTITLE || PROJECT_NAME;
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
                        title: this.getTitle(),
                        subtitle: this.getSubtitle(),
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
                                    keyValue: {
                                        topLabel: "Repository",
                                        content: this.repoName,
                                    }
                                },
                                {
                                    keyValue: {
                                        topLabel: "Branch",
                                        content: this.branchName,
                                    }
                                },
                                {
                                    keyValue: {
                                        topLabel: "Commit SHA",
                                        content: this.shortSHA
                                    }
                                },
                                {
                                    keyValue: {
                                        topLabel: "Revision ID",
                                        content: this.revision
                                    }
                                },
                                {
                                    keyValue: {
                                        topLabel: "Trigger Name",
                                        content: this.trigger
                                    }
                                },
                                {
                                    keyValue: {
                                        topLabel: "Start Time",
                                        content: this.startAt.toUTCString()
                                    }
                                },
                                {
                                    keyValue: {
                                        topLabel: "Finish Time",
                                        content: (this.endAt && this.endAt.toUTCString()) || "Unknown"
                                    }
                                },
                                {
                                    keyValue: {
                                        topLabel: "Elapsed Time",
                                        content: this.timeSpan
                                    }
                                },
                                {
                                    textParagraph: {
                                        text: "<font color='#B3B3B3'>made with sheer <font color=\"#ff0000\"><b>&hearts;<b></font> <font color='#B3B3B3'>by <a href='https://github.com/mukarramishaq'>MKDEBUG</a></font>"
                                    }
                                }
                            ],
                            collapsable: true
                        }
                    ]
                }
            ]
        }
    }

}


export default GoogleChatRoomClient;