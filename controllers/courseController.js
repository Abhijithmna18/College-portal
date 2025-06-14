const Course = require('../models/course.model');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { courseCode, title, credits, department, prerequisites, type, syllabusLink } = req.body;
    const newCourse = new Course({ courseCode, title, credits, department, prerequisites, type, syllabusLink });
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully!', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// Get all courses by department
exports.getCoursesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    const courses = await Course.find({ department });
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};
