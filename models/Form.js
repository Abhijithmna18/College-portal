const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  studentPhone: {
    type: String,
    required: true,
  },
  programApplied: {
    type: String,
    required: true,
  },
  documents: [{
    type: String, // You can store document paths or URLs
    required: true
  }],
  status: {
    type: String,
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
