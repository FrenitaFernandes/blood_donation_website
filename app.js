require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./src/models/db');
const donorRoutes = require('./src/routes/donorRoutes');
const requestRoutes = require('./src/routes/requestRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const miscRoutes = require('./src/routes/miscRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/donors', donorRoutes);
app.use('/request', requestRoutes);
app.use('/admin', adminRoutes);
app.post('/contact', require('./src/controllers/miscController').submitContact);

// Health check endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'Blood Donation API is running!', endpoints: { donors: '/donors', request: '/request', admin: '/admin', contact: '/contact' } });
});

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Blood Donation API Server', version: '1.0.0', visit: 'http://localhost:3000' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`\n🚀 API Server running on http://localhost:${PORT}`);
            console.log(`📱 Visit React app at http://localhost:3000\n`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err.message);
        console.error('\nTroubleshooting:');
        console.error('1. Is MongoDB running? Check Services or start mongod');
        console.error('2. Check MONGO_URI in .env file');
        console.error('3. Verify port 27017 is available\n');
        process.exit(1);
    }
};

startServer();
