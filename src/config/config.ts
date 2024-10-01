// import { config } from 'dotenv';
// import { cleanEnv, str, num } from 'envalid';
// import path from 'path';
// config({
//     path: path.resolve(__dirname, '../../', `.env.${process.env.NODE_ENV}.local`)
// });

// const env = cleanEnv(process.env, {
//     ENV: str({ choices: ['test', 'development', 'production'] }),
//     DB_PORT: num({ default: 3306 }),
//     DB_SERVER_URL: str(),
//     DB_URL: str()
// });

// export { env };

import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

export default {
    // General
    ENV: process.env.ENV,
    PORT: process.env.DB_PORT,
    SERVER_URL: process.env.DB_SERVER_URL,

    // Database
    DATABASE_URL: process.env.DB_URL
};
