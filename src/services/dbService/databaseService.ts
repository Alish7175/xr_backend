// import mongoose from 'mongoose';
// import config from '../../config/config.js';

// export default {
//     connect: async function () {
//         try {
//             await mongoose.connect(config.DATABASE_URL as string);
//             return mongoose.connection;
//         } catch (err) {
//             throw err;
//         }
//     }
// };

import mongoose from 'mongoose';
import config from '../../config/config.js'; // Ensure the path is correct for your config file
import logger from '../../utils/logger.js';

export default {
    connect: async function (): Promise<mongoose.Connection | null> {
        try {
            await mongoose.connect(config.DATABASE_URL as string, {
                serverSelectionTimeoutMS: 5000, // Timeout if MongoDB server cannot be selected
                connectTimeoutMS: 10000, // Timeout for initial connection
                family: 4 // Force IPv4 for DNS resolution
            });
            logger.info('Connected to MongoDB Atlas');
            return mongoose.connection;
        } catch (err) {
            logger.error('MongoDB Atlas connection error:', err);
            throw err;
        }
    }
};

