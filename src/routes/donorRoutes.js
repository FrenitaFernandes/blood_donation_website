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

// Get all donors (including unavailable) - for admin
router.get('/admin/all', donorController.getAllDonors);

// Update donor availability
router.put('/:id/availability', donorController.updateDonorAvailability);

// Delete donor profile
router.delete('/:id', donorController.deleteDonor);

module.exports = router;
