const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // student or staff
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], required: true },
  userType: { type: String, enum: ['Student', 'Staff'], required: true } // differentiate users
});

module.exports = mongoose.model('Attendance', attendanceSchema);
