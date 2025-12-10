-- Create the blood_donation1 database
CREATE DATABASE IF NOT EXISTS blood_donation1;
USE blood_donation1;

-- Create donors table
CREATE TABLE IF NOT EXISTS donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create blood_requests table
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some sample data for testing
INSERT INTO donors (name, age, gender, blood_group, contact_phone, contact_email, city, is_available) VALUES
('John Doe', 25, 'Male', 'O+', '123-456-7890', 'john.doe@email.com', 'New York', TRUE),
('Jane Smith', 30, 'Female', 'A+', '098-765-4321', 'jane.smith@email.com', 'Los Angeles', TRUE),
('Mike Johnson', 28, 'Male', 'B+', '555-123-4567', 'mike.johnson@email.com', 'Chicago', TRUE),
('Sarah Wilson', 26, 'Female', 'AB-', '444-789-0123', 'sarah.wilson@email.com', 'Houston', TRUE),
('David Brown', 32, 'Male', 'O-', '333-456-7890', 'david.brown@email.com', 'Phoenix', TRUE);

INSERT INTO blood_requests (patient_name, required_blood_group, location, hospital_name, blood_units, urgency, contact_phone, contact_email) VALUES
('Alice Cooper', 'O+', 'New York', 'City General Hospital', 2, 'High', '111-222-3333', 'alice.cooper@email.com'),
('Bob Martinez', 'A-', 'Los Angeles', 'St. Mary Medical Center', 1, 'Medium', '222-333-4444', 'bob.martinez@email.com'),
('Carol White', 'B+', 'Chicago', 'Northwestern Memorial', 3, 'Critical', '333-444-5555', 'carol.white@email.com');