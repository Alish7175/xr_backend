import { NextFunction, Request, Response } from 'express';
import { THttpError } from '../types/commonTypes.js';

export default (err: THttpError, _: Request, res: Response, __: NextFunction) => {
    // Default status code to 500 if not provided
    const statusCode = err.statusCode || 500;
    console.log(__);

    // Safely handle the stack, ensuring it is defined and only showing it in development mode
    const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;

    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'An unexpected error occurred',
        stack: stack // Only send stack if in development mode
    });
};

