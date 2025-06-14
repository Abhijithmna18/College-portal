const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');

// Submit an inquiry
router.post('/inquiry', inquiryController.submitInquiry);

// Admin views all inquiries
router.get('/inquiries', inquiryController.getInquiries);

// Alternate route for submission (optional)
router.post('/submit', inquiryController.submitInquiry);

// Update and Delete
router.put('/inquiries/:id', inquiryController.updateInquiry);
router.delete('/inquiries/:id', inquiryController.deleteInquiry);

module.exports = router;
