const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Register admin
router.post('/register', adminController.registerAdmin);

// Login
router.post('/login', adminController.login);

// Verify token
router.get('/verify', adminController.verifyToken);

// Get all admins
router.get('/all', adminController.getAllAdmins);

module.exports = router;
