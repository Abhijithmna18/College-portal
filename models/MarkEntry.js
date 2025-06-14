const mongoose = require('mongoose');

const markEntrySchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  examType: { type: String, enum: ['internal', 'external'], required: true },
  examDate: { type: Date, required: true },
});

module.exports = mongoose.model('MarkEntry', markEntrySchema);
