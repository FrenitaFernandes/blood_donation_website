const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Create a new blood request
router.post('/create', requestController.submitRequest);
router.post('/submit', requestController.submitRequest);

// Get all blood requests
router.get('/all', requestController.getInboxRequests);
router.get('/inbox', requestController.getInboxRequests);

module.exports = router;
