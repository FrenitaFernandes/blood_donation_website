require('dotenv').config();
const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

async function seedDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);

        console.log('🌱 Seeding database with sample data...');

        // Clear existing data (optional)
        await connection.execute('DELETE FROM blood_requests');
        await connection.execute('DELETE FROM donors');
        console.log('🧹 Cleared existing data');

        // Seed donors
        const donors = [
            ['John Doe', 25, 'Male', 'O+', '123-456-7890', 'john.doe@email.com', 'New York', true],
            ['Jane Smith', 30, 'Female', 'A+', '098-765-4321', 'jane.smith@email.com', 'Los Angeles', true],
            ['Mike Johnson', 28, 'Male', 'B+', '555-123-4567', 'mike.johnson@email.com', 'Chicago', true],
            ['Sarah Wilson', 26, 'Female', 'AB-', '444-789-0123', 'sarah.wilson@email.com', 'Houston', true],
            ['David Brown', 32, 'Male', 'O-', '333-456-7890', 'david.brown@email.com', 'Phoenix', true],
            ['Emily Davis', 24, 'Female', 'A-', '666-777-8888', 'emily.davis@email.com', 'Philadelphia', true],
            ['Robert Miller', 29, 'Male', 'B-', '777-888-9999', 'robert.miller@email.com', 'San Antonio', true],
            ['Lisa Garcia', 27, 'Female', 'AB+', '888-999-0000', 'lisa.garcia@email.com', 'San Diego', true]
        ];

        const donorQuery = `
            INSERT INTO donors (name, age, gender, blood_group, contact_phone, contact_email, city, is_available) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        for (const donor of donors) {
            await connection.execute(donorQuery, donor);
        }
        console.log(`✅ Inserted ${donors.length} donors`);

        // Seed blood requests
        const requests = [
            ['Alice Cooper', 'O+', 'New York', 'City General Hospital', 2, 'High', '111-222-3333', 'alice.cooper@email.com'],
            ['Bob Martinez', 'A-', 'Los Angeles', 'St. Mary Medical Center', 1, 'Medium', '222-333-4444', 'bob.martinez@email.com'],
            ['Carol White', 'B+', 'Chicago', 'Northwestern Memorial', 3, 'Critical', '333-444-5555', 'carol.white@email.com'],
            ['Daniel Lee', 'AB-', 'Houston', 'Methodist Hospital', 1, 'Low', '444-555-6666', 'daniel.lee@email.com'],
            ['Emma Taylor', 'O-', 'Phoenix', 'Mayo Clinic', 2, 'High', '555-666-7777', 'emma.taylor@email.com']
        ];

        const requestQuery = `
            INSERT INTO blood_requests (patient_name, required_blood_group, location, hospital_name, blood_units, urgency, contact_phone, contact_email) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        for (const request of requests) {
            await connection.execute(requestQuery, request);
        }
        console.log(`✅ Inserted ${requests.length} blood requests`);

        await connection.end();
        console.log('🎉 Database seeded successfully!');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;