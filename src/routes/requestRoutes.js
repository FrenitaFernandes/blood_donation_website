const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Create a new blood request
router.post('/create', requestController.submitRequest);
router.post('/submit', requestController.submitRequest);

// Get all blood requests
router.get('/all', requestController.getInboxRequests);
router.get('/inbox', requestController.getInboxRequests);

// Get requests by status
router.get('/status', requestController.getRequestsByStatus);

// Update request status
router.put('/:id/status', requestController.updateRequestStatus);

// Delete request
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
