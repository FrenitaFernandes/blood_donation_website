const express = require('express');
const router = express.Router();
const miscController = require('../controllers/miscController');

// Home page route
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;