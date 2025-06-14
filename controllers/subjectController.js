const Subject = require('../models/subject.model');
const Course = require('../models/course.model');

// Assign a subject to a course
exports.assignSubjectToCourse = async (req, res) => {
  try {
    const { subjectCode, title, courseId, faculty, electiveSeats } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const newSubject = new Subject({ subjectCode, title, course: courseId, faculty, electiveSeats });
    await newSubject.save();
    res.status(201).json({ message: 'Subject assigned to course successfully!', subject: newSubject });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning subject to course', error: error.message });
  }
};

// Get all subjects for a course
exports.getSubjectsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const subjects = await Subject.find({ course: courseId });
    res.status(200).json({ subjects });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error: error.message });
  }
};
