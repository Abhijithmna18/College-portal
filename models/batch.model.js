const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchCode: { type: String, required: true },
  academicYear: { type: String, required: true },
  maxStudents: { type: Number, required: true },
  facultyAdvisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  timetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Timetable' },
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;
