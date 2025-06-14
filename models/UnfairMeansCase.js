const mongoose = require('mongoose');

const unfairMeansSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  examType: { type: String, enum: ['internal', 'external'], required: true },
  description: { type: String, required: true },
  actionTaken: { type: String },
  dateReported: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UnfairMeansCase', unfairMeansSchema);
