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
        return `
        <table style="width: 100%;
        background-color: #ffffff;
        border-collapse: collapse;
        border-width: 2px;
        border-color: #5f5f5d;
        border-style: solid;
        color: #000000;">
          <tbody>
          ${this.fieldsValue.reduce((result, field) => {
              result += `
          <tr>
              <th style="border-width: 2px;
              border-color: #5f5f5d;
              border-style: solid;
              padding: 3px;background-color: #d9cfa6;">${field.displayName}</th>
              <td style="border-width: 2px;
              border-color: #5f5f5d;
              border-style: solid;
              padding: 3px;">${field.value}</td>
          </tr>
          `;
              return result;
          }, ``)}
          </tbody>
        </table>
        <!-- Codes by Quackit.com -->
        `;
    }
}
