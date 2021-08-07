import { Client } from "../Client";
import { FieldNames } from "../../utils/constants";
import { EMAIL_USERS, PROJECT_NAME, SMTP_CREDENTIALS } from "../../config/env";
import nodemailer, { SentMessageInfo } from "nodemailer";

export class SMTPClient extends Client {
    protected transporter: nodemailer.Transporter<SentMessageInfo>;
    constructor() {
        super();
        this.transporter = nodemailer.createTransport(SMTP_CREDENTIALS as any);
    }

    async send() {
        return await this.transporter.sendMail({
            ...EMAIL_USERS,
            subject: `${PROJECT_NAME} | ${
                this.fieldsData[FieldNames.REPO_NAME].value
            } | ${this.fieldsData[FieldNames.BRANCH_NAME].value} | ${
                this.fieldsData[FieldNames.STATUS].value
            }`,
            html: this.composeHtmlBody(),
        });
    }

    public isActive() {
        return (
            !!SMTP_CREDENTIALS &&
            !!SMTP_CREDENTIALS.host &&
            !!SMTP_CREDENTIALS.port
        );
    }

    protected composeHtmlBody() {
        return `<style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;}
        .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg .tg-llyw{background-color:#c0c0c0;border-color:inherit;text-align:left;vertical-align:top}
        .tg .tg-oyn9{background-color:#c0c0c0;border-color:#c0c0c0;text-align:center;vertical-align:top}
        .tg .tg-y698{background-color:#efefef;border-color:inherit;text-align:left;vertical-align:top}
        </style>
        <table class="tg">
        <tbody>
          ${this.fieldsValue.reduce((result, field) => {
              result += `
            <tr>
                <th class="tg-llyw">${field.displayName}</th>
                <td class="tg-y698">${field.value}</td>
            </tr>
            `;
              return result;
          }, ``)}
        </tbody>
        </table>`;
    }
}
