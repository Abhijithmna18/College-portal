const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Assign subject to a course
router.post('/', subjectController.assignSubjectToCourse);

// Get all subjects for a course
router.get('/course/:courseId', subjectController.getSubjectsByCourse);

module.exports = router;
