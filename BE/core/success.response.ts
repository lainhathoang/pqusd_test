'use strict';

import { httpStatusCode } from "./httpStatusCode";

const {StatusCodes,ReasonPhrases} = httpStatusCode

interface SuccessResponseOptions {
    message?: string;
    statusCode?: number;
    reasonStatusCode?: string;
    metadata?: Record<string, any>;
}

export class SuccessResponse {
    message: string;
    status: number;
    metadata: Record<string, any>;

    constructor({ message, statusCode = StatusCodes.OK, reasonStatusCode = ReasonPhrases.OK, metadata = {} }:SuccessResponseOptions) {
        this.message = message || reasonStatusCode
        this.status = statusCode
        this.metadata = metadata
    }

    send(res: any, headers = {}) {
        return res.status(this.status).json(this)
    }

}

interface OKOptions {
    message?: string;
    metadata: any;
}

export class OK extends SuccessResponse {
    constructor({ message, metadata = {} }:OKOptions) {
        super({ message, metadata })
    }
}

interface CREATEDOptions extends OKOptions {
    options?: Record<string, any>;
    statusCode?: number;
    reasonStatusCode?: string;

}

export class CREATED extends SuccessResponse {
    options: {};
    constructor({ options = {}, message, metadata = {}, statusCode = StatusCodes.CREATED, reasonStatusCode = ReasonPhrases.CREATED }:CREATEDOptions) {
        super({ message, metadata, statusCode, reasonStatusCode })
        this.options = options
    }
}
