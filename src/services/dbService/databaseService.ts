import mongoose from 'mongoose';
import config from '../../config/config.js';

export default {
    connect: async function () {
        try {
            await mongoose.connect(config.DATABASE_URL as string);
            return mongoose.connection;
        } catch (err) {
            throw err;
        }
    }
};
