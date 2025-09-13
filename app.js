const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./src/models/db');
const donorRoutes = require('./src/routes/donorRoutes');
const requestRoutes = require('./src/routes/requestRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MySQL
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
    connection.release();
});

// Use routes (frontend-friendly style)
app.use('/donors', donorRoutes);
app.use('/requests', requestRoutes);

// Frontend routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/find', (req, res) => {
    res.render('find');
});

app.get('/request', (req, res) => {
    res.render('request');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/requests', (req, res) => {
    res.render('requests');
});

// API status route (optional, just to test backend)
app.get('/api', (req, res) => {
    res.send('Blood Donation API is running. Use /donors and /requests endpoints.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
