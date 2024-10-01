import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/apiRoutes.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import responseMessage from './constants/responseMessage.js';
import httpError from './utils/httpError.js';
import cors from 'cors';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();

//Middleware
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: ['*'],
        credentials: true
    })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

//Routes
app.use('/api/v1', router);

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'));
    } catch (err) {
        httpError(next, err, req, 404);
    }
});

//global error handler
app.use(globalErrorHandler);

export default app;

