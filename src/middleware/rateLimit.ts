import { NextFunction, Request, Response } from 'express';
//commented few lines for testing the rate limier

import config from '../config/config.js';
import { EApplicationEnvironment } from '../constants/application.js';
import { rateLimiterMongo } from '../config/rate_limiter.js';
import httpError from '../utils/httpError.js';
import responseMessage from '../constants/responseMessage.js';

export default (req: Request, _: Response, next: NextFunction) => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return next();
    }

    if (rateLimiterMongo) {
        rateLimiterMongo
            .consume(req.ip as string, 1)
            .then(() => {
                next();
            })
            .catch(() => {
                httpError(next, new Error(responseMessage.TOO_MANY_REQUESTS), req, 429);
            });
    }
};
