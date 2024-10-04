import app from './app.js';
import config from './config/config.js';
import { initRateLimiter } from './config/rate_limiter.js';
import databaseService from './services/dbService/databaseService.js';
import logger from './utils/logger.js';

const server = app.listen(config.PORT);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    try {
        //db connection
        const connection = await databaseService.connect();
        if (connection !== null) {
            initRateLimiter(connection);
            logger.info(`RATE_LIMITER_INITIATED`);

            logger.info(`DATABASE_CONNECTION`, {
                meta: {
                    CONNECTION_NAME: connection.name
                }
            });
        }

        logger.info(`APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    } catch (err: Error | unknown) {
        logger.error(`APPLICATION_ERROR`, { meta: err });
        server.close((error: unknown) => {
            if (error) {
                logger.error(`APPLICATION_ERROR`, { meta: error });
            }
            process.exit(1);
        });
    }
})();

