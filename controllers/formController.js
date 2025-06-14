const Form = require('../models/Form'); // Ensure this path is correct

// Create new form with file uploads
const createForm = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded. Please upload documents.',
      });
    }

    const documents = req.files.map(file => file.path);

    const formData = new Form({
      studentName: req.body.studentName,
      studentEmail: req.body.studentEmail,
      studentPhone: req.body.studentPhone,
      programApplied: req.body.programApplied,
      documents: documents,
    });

    await formData.save();

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      form: formData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get status of a form by student ID
const getFormStatus = async (req, res) => {
  try {
    const { studentId } = req.params;
    const form = await Form.findById(studentId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found for the given student ID.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Form status retrieved successfully',
      status: form.status || 'Pending',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all form submissions (for admin or dashboard)
const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({
      success: true,
      message: 'All forms retrieved successfully',
      data: forms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createForm,
  getFormStatus,
  getAllForms
};
