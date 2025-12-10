require('dotenv').config();

const config = {
    development: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'blood_donation1',
        port: process.env.DB_PORT || 3306,
        ssl: false
    },
    production: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        ssl: process.env.DB_SSL === 'true' ? {
            ca: process.env.DB_SSL_CA,
            cert: process.env.DB_SSL_CERT,
            key: process.env.DB_SSL_KEY,
            rejectUnauthorized: false
        } : false
    },
    test: {
        host: process.env.TEST_DB_HOST || 'localhost',
        user: process.env.TEST_DB_USER || 'root',
        password: process.env.TEST_DB_PASSWORD || '',
        database: process.env.TEST_DB_NAME || 'blood_donation1_test',
        port: process.env.TEST_DB_PORT || 3306,
        ssl: false
    }
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];