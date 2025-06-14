const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

// Create a new batch
router.post('/', batchController.createBatch);

// Get batch details for a specific academic year
router.get('/:year', batchController.getBatchesByYear);

module.exports = router;
