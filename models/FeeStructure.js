const mongoose = require('mongoose');

const feeStructureSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  semester: { type: Number, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
});

module.exports = mongoose.model('FeeStructure', feeStructureSchema);

