require('dotenv').config();
const mysql = require('mysql2');
const dbConfig = require('../config/database');

// Create the connection pool using configuration
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
    connection.release();
});

// Handle connection errors
pool.on('connection', function (connection) {
    console.log('Database connection established as id ' + connection.threadId);
});

pool.on('error', function(err) {
    console.error('Database error:', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Database connection was closed.');
    }
    if(err.code === 'ER_CON_COUNT_ERROR') {
        console.log('Database has too many connections.');
    }
    if(err.code === 'ECONNREFUSED') {
        console.log('Database connection was refused.');
    }
});

// Export the pool to be used in other modules.
module.exports = pool;
