const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Route to handle the submission of a new blood request form.

// Route to handle the submission of a new blood request form.
router.post('/submit', requestController.submitRequest);

// Route to display all blood requests in inbox
router.get('/inbox', requestController.getInboxRequests);

module.exports = router;
