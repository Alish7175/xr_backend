import { Request, Response, NextFunction } from 'express';
import { createFormSubmission } from '../services/docSubmissionServices.js';

export const submitForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract the form data from the request body
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const formData = req.body;

        // Extract the uploaded files (handled by multer)
        const files = req.files as Express.Multer.File[];

        // Prepare the documents array to store the file information
        const documents = files.map((file) => ({
            fileName: file.originalname,
            fileType: file.mimetype.includes('image') ? 'image' : 'pdf',
            filePath: file.path // This is the path where the file is stored locally
        }));

        // Combine form data and documents and pass it to the service layer
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const savedForm = await createFormSubmission({
            ...formData, // Spread form data
            documents // Include the documents array
        });

        // Send a success response with the saved form data
        res.status(201).json(savedForm);
    } catch (error) {
        next(error); // Pass the error to Express error-handling middleware
    }
};
