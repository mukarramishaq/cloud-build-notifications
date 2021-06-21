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
    return validators[BUILD_VENDOR] || function (req, res, next) {
        next(new Error(`No validator for build vendor "${BUILD_VENDOR} found"`));
    } as Handler;
}
