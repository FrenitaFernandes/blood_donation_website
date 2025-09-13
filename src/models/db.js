const mysql = require('mysql2');

// Create the connection pool.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // You must replace this with your actual MySQL password.
    database: 'blood_donation1', // Your database name.
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the pool to be used in other modules.
module.exports = pool;
