import { GoogleCloudBuild } from "./GoogleCloudBuildEventValidator";
import { BUILD_VENDOR } from "./../config/env";
import { Handler, Request, Response, NextFunction } from "express";

export const validators: {
    [vendorName: string]: Handler
} = {
    GoogleCloudBuild: GoogleCloudBuild
};

/**
 * this will retrieve the validator
 * of the mentioned build vendor
 */
export const getValidator = () => {
    const fallbackHandler: Handler = (req, res, next) => {
        next(new Error(`No validator for build vendor "${BUILD_VENDOR} found"`));
    };
    return validators[BUILD_VENDOR] || fallbackHandler;
}
