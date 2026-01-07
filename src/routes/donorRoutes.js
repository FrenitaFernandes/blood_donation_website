const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

// Register donor (form POST)
router.post('/register', donorController.registerDonor);

// Show all donors
router.get('/', donorController.listDonors);

// Search donors with filters
router.get('/search', donorController.findDonors);
router.get('/find', donorController.findDonors);

module.exports = router;
