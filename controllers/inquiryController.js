const Inquiry = require('../models/Inquiry');

// Submit an inquiry (for users)
exports.submitInquiry = async (req, res) => {
  const { name, email, phone, program, query } = req.body;

  try {
    if (!name || !email || !phone || !program || !query) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const inquiry = new Inquiry({ name, email, phone, program, query });
    await inquiry.save();

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// Get all inquiries (for admin view)
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};
// Update an existing inquiry
exports.updateInquiry = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const inquiry = await Inquiry.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};
// Delete an inquiry
exports.deleteInquiry = async (req, res) => {
  const { id } = req.params;

  try {
    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};
