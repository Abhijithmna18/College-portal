// models/admissionModel.js

const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  documents: { type: [String], default: [] }, // Array of document file paths
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);
