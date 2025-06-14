const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true },
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  electiveSeats: { type: Number, required: true },
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
