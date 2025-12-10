require('dotenv').config();
const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

async function createDatabase() {
    try {
        // Connect without database name to create it
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port
        });

        // Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        console.log(`✅ Database '${dbConfig.database}' created or already exists`);
        
        await connection.end();

        // Reconnect to the specific database
        const dbConnection = await mysql.createConnection(dbConfig);

        // Create donors table
        await dbConnection.execute(`
            CREATE TABLE IF NOT EXISTS donors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                age INT NOT NULL,
                gender ENUM('Male', 'Female', 'Other') NOT NULL,
                blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
                contact_phone VARCHAR(20) NOT NULL,
                contact_email VARCHAR(255) NOT NULL UNIQUE,
                city VARCHAR(255) NOT NULL,
                is_available BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_blood_group (blood_group),
                INDEX idx_city (city),
                INDEX idx_available (is_available)
            )
        `);
        console.log('✅ Donors table created or already exists');

        // Create blood_requests table
        await dbConnection.execute(`
            CREATE TABLE IF NOT EXISTS blood_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                patient_name VARCHAR(255) NOT NULL,
                required_blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
                location VARCHAR(255) NOT NULL,
                hospital_name VARCHAR(255) NOT NULL,
                blood_units INT NOT NULL DEFAULT 1,
                urgency ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL DEFAULT 'Medium',
                contact_phone VARCHAR(20) NOT NULL,
                contact_email VARCHAR(255) NOT NULL,
                status ENUM('Pending', 'Fulfilled', 'Cancelled') DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_blood_group (required_blood_group),
                INDEX idx_urgency (urgency),
                INDEX idx_status (status),
                INDEX idx_location (location)
            )
        `);
        console.log('✅ Blood requests table created or already exists');

        await dbConnection.end();
        console.log('🎉 Database setup completed successfully!');
        
    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}

// Run the setup if this file is executed directly
if (require.main === module) {
    createDatabase();
}

module.exports = createDatabase;