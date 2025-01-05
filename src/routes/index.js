const express = require('express');
const router = express.Router();
const { getIndex } = require('../controllers/index');

// Define the routes
router.get('/', getIndex);

// Export the router
module.exports = router;