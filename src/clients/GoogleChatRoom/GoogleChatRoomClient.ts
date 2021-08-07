import { Client } from "../Client";
import { FieldNames } from "../../utils/constants";
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
        return `${this.fieldsData[FieldNames.REPO_NAME].value}  >>  ${
            this.fieldsData[FieldNames.BRANCH_NAME].value
        }`;
    }

    protected getSubtitle() {
        return MESSAGE_SUBTITLE || PROJECT_NAME;
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
                                        content: this.fieldsData[
                                            FieldNames.STATUS
                                        ].value,
                                        button: {
                                            textButton: {
                                                text: "Open Logs",
                                                onClick: {
                                                    openLink: {
                                                        url: this.fieldsData[
                                                            FieldNames.LOG_URL
                                                        ].value,
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
                                ...this.fieldsValue.map((field) => {
                                    return {
                                        keyValue: {
                                            topLabel: field.displayName,
                                            content: field.value,
                                        },
                                    };
                                }),
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
