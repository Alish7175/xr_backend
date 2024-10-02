import FormSubmission, { IFormSubmission } from '../model/UserFormSchema.js';

// Function to handle form submission data
export const createFormSubmission = async (formData: IFormSubmission): Promise<IFormSubmission> => {
    try {
        const formSubmission = new FormSubmission(formData);
        const savedForm = await formSubmission.save();
        return savedForm;
    } catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            throw new Error(error.message); // Safely access error.message
        } else {
            // Handle the case where error is not an instance of Error
            throw new Error('An unknown error occurred');
        }
    }
};
