import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the documents array
interface IDocument {
    fileName: string;
    fileType: 'image' | 'pdf';
    filePath: string;
}

// Define the interface for the form submission
export interface IFormSubmission extends Document {
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
        dob: Date;
    };
    residentialAddress: {
        street1: string;
        street2?: string;
    };
    permanentAddress: {
        street1: string;
        street2?: string;
    };
    documents: IDocument[];
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the schema for personal information
const personalInfoSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function (date: Date) {
                const age = new Date().getFullYear() - new Date(date).getFullYear();
                return age >= 18;
            },
            message: 'You must be at least 18 years old'
        }
    }
});

// Define the schema for addresses
const addressSchema = new Schema({
    street1: { type: String, required: true },
    street2: { type: String, default: null }
});

// Define the schema for documents
const documentSchema = new Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, enum: ['image', 'pdf'], required: true },
    filePath: { type: String, required: true }
});

// Main form submission schema
const formSchema = new Schema<IFormSubmission>(
    {
        personalInfo: personalInfoSchema,
        residentialAddress: addressSchema,
        permanentAddress: addressSchema,
        documents: {
            type: [documentSchema],
            validate: [(v: IDocument[]) => v.length >= 2, 'At least 2 documents are required']
        }
    },
    {
        timestamps: true // Automatically create `createdAt` and `updatedAt`
    }
);

// Create and export the Mongoose model
const FormSubmission = mongoose.model<IFormSubmission>('FormSubmission', formSchema);

export default FormSubmission;
