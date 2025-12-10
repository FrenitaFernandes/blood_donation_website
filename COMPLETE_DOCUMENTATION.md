# Blood Donation Website - Complete Documentation

## 🎯 **Project Purpose**
A web application that connects blood donors with people in need of blood transfusions, facilitating the process of finding and requesting blood donations.

---

## 🛠️ **Technology Stack**

### **Backend Technologies:**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MySQL2** - Database driver for MySQL
- **EJS** - Embedded JavaScript templating engine
- **dotenv** - Environment variable management
- **body-parser** - Request body parsing middleware

### **Frontend Technologies:**
- **HTML5** - Structure and content
- **CSS3** - Styling and layout
- **JavaScript** - Client-side interactivity
- **EJS Templates** - Dynamic content rendering

### **Database:**
- **MySQL** - Relational database management system
- **XAMPP** - Local development environment

---

## 📊 **Database Design**

### **Database Schema:**

#### **1. donors Table**
```sql
CREATE TABLE donors (
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
);
```

#### **2. blood_requests Table**
```sql
CREATE TABLE blood_requests (
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
);
```

---

## 🔄 **Application Flow**

### **1. System Initialization**
```javascript
// app.js - Entry Point
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const donorRoutes = require('./src/routes/donorRoutes');
const requestRoutes = require('./src/routes/requestRoutes');
const miscRoutes = require('./src/routes/miscRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Route mounting
app.use('/', miscRoutes);
app.use('/', donorRoutes);
app.use('/', requestRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### **2. Database Connection Management**
```javascript
// src/models/db.js
require('dotenv').config();
const mysql = require('mysql2');
const dbConfig = require('../config/database');

const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Connection testing and error handling
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
    connection.release();
});

module.exports = pool;
```

### **3. Environment Configuration**
```javascript
// src/config/database.js
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
        ssl: process.env.DB_SSL === 'true'
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];
```

---

## 🎯 **Core Features & Implementation**

### **1. Donor Registration**
```javascript
// src/controllers/donorController.js
exports.registerDonor = (req, res) => {
    const { name, age, gender, blood_group, phone, email, city, is_available } = req.body;
    
    const sql = `INSERT INTO donors (name, age, gender, blood_group, contact_phone, contact_email, city, is_available) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [name, age, gender, blood_group, phone, email, city, is_available === 'on' ? 1 : 0];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Error saving donor information.');
        }
        res.redirect('/donors');
    });
};
```

### **2. Donor Search & Filtering**
```javascript
// src/controllers/donorController.js
exports.findDonors = (req, res) => {
    const { blood_group, city } = req.query;
    let sql = 'SELECT * FROM donors WHERE is_available = TRUE';
    const values = [];

    if (blood_group && blood_group !== 'any') {
        sql += ' AND blood_group = ?';
        values.push(blood_group);
    }
    if (city) {
        sql += ' AND city = ?';
        values.push(city);
    }

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.send('Error fetching donors.');
        }
        res.render('donors', { 
            donors: results, 
            blood_group: blood_group === 'any' ? null : blood_group, 
            city 
        });
    });
};
```

### **3. Blood Request Management**
```javascript
// src/controllers/requestController.js
exports.submitRequest = (req, res) => {
    const { patient_name, required_blood_group, location, hospital_name, blood_units, urgency, contact_phone, contact_email } = req.body;
    
    const sql = `INSERT INTO blood_requests (patient_name, required_blood_group, location, hospital_name, blood_units, urgency, contact_phone, contact_email) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [patient_name, required_blood_group, location, hospital_name, blood_units, urgency, contact_phone, contact_email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Error saving blood request.');
        }
        res.redirect('/');
    });
};
```

### **4. Request Inbox**
```javascript
// src/controllers/requestController.js
exports.getInboxRequests = (req, res) => {
    const sql = 'SELECT * FROM blood_requests ORDER BY created_at DESC';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.send('Error fetching blood requests.');
        }
        res.render('inbox', { requests: results });
    });
};
```

---

## 🛣️ **Routing Structure**

### **1. Miscellaneous Routes**
```javascript
// src/routes/miscRoutes.js
const express = require('express');
const miscController = require('../controllers/miscController');
const router = express.Router();

router.get('/', miscController.getHomePage);
router.get('/about', miscController.getAboutPage);
router.get('/contact', miscController.getContactPage);

module.exports = router;
```

### **2. Donor Routes**
```javascript
// src/routes/donorRoutes.js
const express = require('express');
const donorController = require('../controllers/donorController');
const router = express.Router();

router.get('/register', (req, res) => res.render('register'));
router.post('/register', donorController.registerDonor);
router.get('/donors', donorController.listDonors);
router.get('/find', donorController.findDonors);

module.exports = router;
```

### **3. Request Routes**
```javascript
// src/routes/requestRoutes.js
const express = require('express');
const requestController = require('../controllers/requestController');
const router = express.Router();

router.get('/request', (req, res) => res.render('request'));
router.post('/request', requestController.submitRequest);
router.get('/inbox', requestController.getInboxRequests);

module.exports = router;
```

---

## 🎨 **Frontend Implementation**

### **1. Template Structure (EJS)**
```html
<!-- views/partials/header.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blood Donation Website</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/register">Register as Donor</a></li>
            <li><a href="/donors">Find Donors</a></li>
            <li><a href="/request">Request Blood</a></li>
            <li><a href="/inbox">Inbox</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>
```

### **2. Dynamic Data Rendering**
```html
<!-- views/donors.ejs -->
<%- include('partials/header') %>

<div class="container">
    <h1>Available Blood Donors</h1>
    
    <% if (donors.length > 0) { %>
        <div class="donors-grid">
            <% donors.forEach(donor => { %>
                <div class="donor-card">
                    <h3><%= donor.name %></h3>
                    <p><strong>Blood Group:</strong> <%= donor.blood_group %></p>
                    <p><strong>Age:</strong> <%= donor.age %></p>
                    <p><strong>Gender:</strong> <%= donor.gender %></p>
                    <p><strong>City:</strong> <%= donor.city %></p>
                    <p><strong>Phone:</strong> <%= donor.contact_phone %></p>
                    <p><strong>Email:</strong> <%= donor.contact_email %></p>
                </div>
            <% }) %>
        </div>
    <% } else { %>
        <p>No donors found matching your criteria.</p>
    <% } %>
</div>

<%- include('partials/footer') %>
```

---

## 🔧 **Deployment & Environment Management**

### **1. Package.json Scripts**
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "setup-db": "node src/scripts/setup-database.js",
    "db:create": "node src/scripts/setup-database.js",
    "db:seed": "node src/scripts/seed-database.js"
  }
}
```

### **2. Environment Variables (.env)**
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=blood_donation1
DB_PORT=3306

# Server Configuration
PORT=3001
NODE_ENV=development
```

### **3. Database Setup Script**
```javascript
// src/scripts/setup-database.js
require('dotenv').config();
const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

async function createDatabase() {
    try {
        // Connect and create database
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        await connection.end();

        // Create tables
        const dbConnection = await mysql.createConnection(dbConfig);
        
        // Create donors and blood_requests tables
        // ... table creation logic
        
        console.log('🎉 Database setup completed successfully!');
    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}
```

---

## 🚀 **How to Run the Project**

### **1. Prerequisites**
- Node.js (v14 or higher)
- XAMPP with MySQL
- Git

### **2. Installation Steps**
```bash
# 1. Clone the repository
git clone <repository-url>
cd blood_donation_website

# 2. Install dependencies
npm install

# 3. Start XAMPP MySQL service

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# 5. Create database and tables
npm run setup-db

# 6. Seed with sample data (optional)
npm run db:seed

# 7. Start the application
npm start
```

### **3. Access the Application**
- **URL:** http://localhost:3001
- **Admin Panel:** Not implemented (future enhancement)

---

## 🔍 **Key Features Implemented**

1. **✅ Donor Registration System**
   - Form validation
   - Database storage
   - Unique email constraint

2. **✅ Donor Search & Filtering**
   - Filter by blood group
   - Filter by city
   - Display available donors only

3. **✅ Blood Request Management**
   - Submit blood requests
   - Urgency levels
   - Hospital information

4. **✅ Request Inbox**
   - View all blood requests
   - Chronological ordering
   - Status tracking

5. **✅ Responsive UI**
   - EJS templating
   - CSS styling
   - Mobile-friendly design

6. **✅ Database Management**
   - Connection pooling
   - Error handling
   - Environment-based configuration

7. **✅ Global Deployment Ready**
   - Environment variables
   - Cloud database support
   - Production configuration

---

## 🔒 **Security Considerations**

1. **SQL Injection Prevention**
   - Parameterized queries
   - Input validation

2. **Environment Security**
   - Sensitive data in .env files
   - .gitignore for credentials

3. **Data Validation**
   - Server-side validation
   - Email uniqueness
   - Required field checks

---

## 📈 **Performance Optimizations**

1. **Database Indexing**
   - Blood group indexes
   - City indexes
   - Availability status indexes

2. **Connection Pooling**
   - MySQL connection pool
   - Connection reuse
   - Resource management

3. **Static Asset Serving**
   - Express static middleware
   - Efficient file serving

---

## 🎯 **Future Enhancements**

1. **Authentication & Authorization**
   - User login/registration
   - Role-based access control
   - Session management

2. **Advanced Features**
   - Email notifications
   - SMS alerts
   - Blood compatibility matching

3. **Mobile Application**
   - React Native app
   - Push notifications
   - Offline capabilities

4. **Analytics Dashboard**
   - Donation statistics
   - Request tracking
   - Performance metrics

---

This documentation provides a comprehensive overview of the Blood Donation Website project, covering all aspects from architecture to implementation details.