const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');

// ✅ Import all necessary controller functions
const { createForm, getFormStatus, getAllForms } = require('../controllers/formController');

// POST: Submit form with document uploads
router.post('/submit', upload.array('documents', 5), createForm);

// GET: Get form status by student ID
router.get('/status/:studentId', getFormStatus);

// GET: Get all submitted forms (admin view)
router.get('/', getAllForms);

module.exports = router;
