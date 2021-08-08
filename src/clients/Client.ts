import { Request } from "express";
import { BuildResourceType, MessageType } from "../utils/types";
import formatDistance from "date-fns/formatDistance";

export type FieldValueType = {
    name: string;
    displayName: string;
    value: string;
};

export type FieldsDataType = {
    [fieldName: string]: FieldValueType;
};

export class Client {
    protected message: MessageType;

    protected buildResource: BuildResourceType;
    protected fieldsData: FieldsDataType;
    protected fieldsValue: FieldValueType[];

    /**
     * this will handle the incoming message on successful
     * validation only and will process the message
     * @param {Request} req
     */
    async handle(req: Request) {
        this.message = req.body;
        this.buildResource = JSON.parse(
            Buffer.from(this.message.message.data, "base64").toString()
        );
        this.fieldsValue = await this.processMessage(this.buildResource);
        this.fieldsData = this.fieldsValue.reduce((output, field) => {
            output[field.name] = field;
            return output;
        }, {} as FieldsDataType);
        return await this.send();
    }

    protected getFieldsAndOps = (): {
        name: string;
        displayName: string;
        ops: ((param: any) => Promise<any>)[];
    }[] => {
        return [
            {
                name: "REPO_NAME",
                displayName: "Repository Name",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        return previousOutput.substitutions.REPO_NAME;
                    },
                ],
            },
            {
                name: "BRANCH_NAME",
                displayName: "Branch Name",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        return previousOutput.substitutions.BRANCH_NAME;
                    },
                ],
            },
            {
                name: "SHORT_SHA",
                displayName: "Short SHA",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        return previousOutput.substitutions.SHORT_SHA;
                    },
                ],
            },
            {
                name: "COMMIT_SHA",
                displayName: "Commit SHA",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        return previousOutput.substitutions.COMMIT_SHA;
                    },
                ],
            },
            {
                name: "REVISION_ID",
                displayName: "Revision ID",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        return previousOutput.substitutions.REVISION_ID;
                    },
                ],
            },
            {
                name: "TRIGGER_NAME",
                displayName: "Trigger Name",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        return previousOutput.substitutions.TRIGGER_NAME;
                    },
                ],
            },
            {
                name: "START_TIME",
                displayName: "Start Time",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        return new Date(previousOutput.startTime).toUTCString();
                    },
                    async (previousOutput: string) => {
                        return previousOutput === "Invalid Date"
                            ? new Date().toUTCString()
                            : previousOutput;
                    },
                ],
            },
            {
                name: "FINISH_TIME",
                displayName: "Finish Time",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        return new Date(
                            previousOutput.finishTime
                        ).toUTCString();
                    },
                    async (previousOutput: string) => {
                        return previousOutput === "Invalid Date"
                            ? "Unknown"
                            : previousOutput;
                    },
                ],
            },
            {
                name: "TIME_SPAN",
                displayName: "Time Span",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        const currentDate = new Date();
                        return [
                            new Date(previousOutput.startTime) || currentDate,
                            new Date(previousOutput.startTime) || currentDate,
                        ];
                    },
                    async (previousOutput: [Date, Date]) => {
                        return formatDistance(...previousOutput, {
                            includeSeconds: true,
                        });
                    },
                ],
            },
            {
                name: "STATUS",
                displayName: "Status",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        return previousOutput.status;
                    },
                ],
            },
            {
                name: "LOG_URL",
                displayName: "Log URL",
                ops: [
                    async (previousOutput: BuildResourceType) => {
                        return previousOutput.logUrl;
                    },
                ],
            },
        ];
    };

    protected async processMessage(
        buildResource: BuildResourceType
    ): Promise<FieldValueType[]> {
        const fieldsAndOps = this.getFieldsAndOps();
        return await Promise.all(
            fieldsAndOps.map(async ({ name, displayName, ops }) => {
                const value = await ops.reduce(async (result: any, op) => {
                    const resultValue = await result;
                    return await op(resultValue);
                }, Promise.resolve(buildResource));
                return {
                    name,
                    displayName,
                    value,
                };
            }, {})
        );
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
