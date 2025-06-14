const Batch = require('../models/batch.model');

// Create a new batch
exports.createBatch = async (req, res) => {
  try {
    const { batchCode, academicYear, maxStudents, facultyAdvisor, timetableId } = req.body;
    const newBatch = new Batch({ batchCode, academicYear, maxStudents, facultyAdvisor, timetableId });
    await newBatch.save();
    res.status(201).json({ message: 'Batch created successfully!', batch: newBatch });
  } catch (error) {
    res.status(500).json({ message: 'Error creating batch', error: error.message });
  }
};

// Get batch details by academic year
exports.getBatchesByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const batches = await Batch.find({ academicYear: year });
    res.status(200).json({ batches });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching batches', error: error.message });
  }
};
