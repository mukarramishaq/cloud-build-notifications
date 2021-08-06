import { Request } from "express";
import { BuildResourceType, MessageType, Status } from "./types";
import formatDistance from "date-fns/formatDistance";

export class Client {
    protected message: MessageType;

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
    protected buildResource: BuildResourceType;

    /**
     * this will handle the incoming message on successful
     * validation only and will process the message
     * @param {Request} req
     */
    async handle(req: Request) {
        this.message = req.body;
        this.processMessage();
        return await this.send();
    }

    protected processMessage() {
        const currentDate = new Date();
        this.buildResource = JSON.parse(
            Buffer.from(this.message.message.data, "base64").toString()
        );
        this.repoName = this.buildResource.substitutions.REPO_NAME;
        this.branchName = this.buildResource.substitutions.BRANCH_NAME;
        this.shortSHA = this.buildResource.substitutions.SHORT_SHA;
        this.commitSHA = this.buildResource.substitutions.COMMIT_SHA;
        this.revision = this.buildResource.substitutions.REVISION_ID;
        this.trigger = this.buildResource.substitutions.TRIGGER_NAME;
        this.startAt = new Date(this.buildResource.startTime);
        this.endAt =
            this.buildResource.finishTime &&
            new Date(this.buildResource.finishTime);
        this.timeSpan = formatDistance(
            this.endAt || currentDate,
            this.startAt || currentDate,
            { includeSeconds: true }
        );
        this.status = this.buildResource.status;
        this.logUrl = this.buildResource.logUrl;
    }

    /**
     * override this function
     * to setup your logic
     * to format and send
     * message
     */
    protected async send() {
        // override it to use it
    }

    /**
     * this will check whether the
     * incoming message is for this
     * client or not. if the incoming message
     * is for this client it must return true
     * otherwise false.
     *
     * There is already a global validator
     * in place to check the message is from
     * cloud build or not, so if you dont need
     * further validations then dont override
     * it or return true
     *
     * @param {Request} req
     * @return {Boolean}
     */
    public validate(req: Request): boolean {
        // override to implement your own logic
        return true;
    }

    /**
     * This function tells whether
     * this client is active or not
     * If it is not active, it wont
     * receive messages to process
     *
     * Override it to accroding to
     * the client
     */
    public isActive(): boolean {
        return true;
    }
}
