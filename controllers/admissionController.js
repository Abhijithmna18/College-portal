// controllers/admissionController.js

const Admission = require('../models/admissionModel');

// Submit new admission
exports.createAdmission = async (req, res) => {
  try {
    const { name, email, course, phone, address } = req.body;
    const documents = req.files ? req.files.map(file => file.path) : [];

    const newAdmission = new Admission({ name, email, course, phone, address, documents });
    await newAdmission.save();

    res.status(201).json({ success: true, message: 'Admission form submitted!', data: newAdmission });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get all admissions (admin use)
exports.getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.status(200).json({ success: true, data: admissions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Update admission status (Accept/Reject)
exports.updateAdmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({ success: false, message: 'Admission not found' });
    }

    admission.status = status;
    await admission.save();

    res.status(200).json({ success: true, message: 'Status updated', data: admission });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
