const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  title: { type: String, required: true },
  credits: { type: Number, required: true },
  department: { type: String, required: true },
  prerequisites: { type: [String], default: [] },
  type: { type: String, enum: ['core', 'elective', 'lab', 'project'], required: true },
  syllabusLink: { type: String, required: true },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
