const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Create a new course
router.post('/', courseController.createCourse);

// Get all courses by department
router.get('/:department', courseController.getCoursesByDepartment);

module.exports = router;
