import { Client } from "../Client";
import { StatusIcon } from "../types";
import fetch from "node-fetch";
import {
    GOOGLE_CHAT_ROOM_WEBHOOK,
    PROJECT_NAME,
    MESSAGE_SUBTITLE,
} from "../../config/env";

export class GoogleChatRoomClient extends Client {
    public isActive() {
        return !!GOOGLE_CHAT_ROOM_WEBHOOK;
    }

    /**
     * @inheritdoc
     */
    protected async send() {
        return await this.sendMessage();
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

    protected async sendMessage() {
        const body = this.createMessageBody();
        await fetch(GOOGLE_CHAT_ROOM_WEBHOOK, {
            method: "post",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .catch((e) =>
                console.error(`Error while send message to Google Chat: `, e)
            );
    }

    protected createMessageBody() {
        return {
            cards: [
                {
                    header: {
                        title: this.getTitle(),
                        subtitle: this.getSubtitle(),
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
                                                        url: this.logUrl,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            widgets: [
                                {
                                    keyValue: {
                                        topLabel: "Repository",
                                        content: this.repoName,
                                    },
                                },
                                {
                                    keyValue: {
                                        topLabel: "Branch",
                                        content: this.branchName,
                                    },
                                },
                                {
                                    keyValue: {
                                        topLabel: "Commit SHA",
                                        content: this.shortSHA,
                                    },
                                },
                                {
                                    keyValue: {
                                        topLabel: "Revision ID",
                                        content: this.revision,
                                    },
                                },
                                {
                                    keyValue: {
                                        topLabel: "Trigger Name",
                                        content: this.trigger,
                                    },
                                },
                                {
                                    keyValue: {
                                        topLabel: "Start Time",
                                        content: this.startAt.toUTCString(),
                                    },
                                },
                                {
                                    keyValue: {
                                        topLabel: "Finish Time",
                                        content:
                                            (this.endAt &&
                                                this.endAt.toUTCString()) ||
                                            "Unknown",
                                    },
                                },
                                {
                                    keyValue: {
                                        topLabel: "Elapsed Time",
                                        content: this.timeSpan,
                                    },
                                },
                                {
                                    textParagraph: {
                                        text:
                                            "<font color='#B3B3B3'>made with sheer <font color=\"#ff0000\"><b>&hearts;<b></font> <font color='#B3B3B3'>by <a href='https://github.com/mukarramishaq'>MKDEBUG</a></font>",
                                    },
                                },
                            ],
                            collapsable: true,
                        },
                    ],
                },
            ],
        };
    }
}
