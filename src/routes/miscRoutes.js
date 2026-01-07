const express = require('express');
const router = express.Router();
const miscController = require('../controllers/miscController');

// API endpoint for contact form (for React)
router.post('/contact', miscController.submitContact);

// Home page route
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;