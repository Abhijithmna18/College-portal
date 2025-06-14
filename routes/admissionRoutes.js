// routes/admissionRoutes.js

const express = require('express');
const router = express.Router();
const { createAdmission, getAllAdmissions, updateAdmissionStatus } = require('../controllers/admissionController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware'); // we will create this next

// Student submits admission form (with documents)
router.post('/submit', upload.array('documents', 5), createAdmission);

// Admin views all admissions
router.get('/', adminOnly, getAllAdmissions);

// Admin updates status
router.put('/:id', adminOnly, updateAdmissionStatus);

module.exports = router;
