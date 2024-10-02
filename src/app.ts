import express, { Application, NextFunction, Request, Response } from 'express';
import connectDb from './services/dbService/databaseService.js';
import path from 'path';
import fs from 'fs';
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
// Connect to MongoDB
await connectDb.connect();

//Middleware
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: ['*'],
        credentials: true
    })
);

// Path to uploads directory
const uploadsDir = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
} else {
    // eslint-disable-next-line no-console
    console.log(`Uploads directory already exists at: ${uploadsDir}`);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use('/uploads', express.static(uploadsDir));

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

