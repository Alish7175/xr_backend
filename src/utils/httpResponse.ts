import { Request, Response } from 'express';
import { THttpResponse } from '../types/commonTypes.js';
import config from '../config/config.js';
import { EApplicationEnvironment } from '../constants/application.js';
import logger from './logger.js';

export default function (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    };

    //log for now, later logger
     
    logger.info(`CONTROLLER_RESPONSE`, { meta: response });

    // Production Env check
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip;
    }

    res.status(responseStatusCode).json(response);
}
