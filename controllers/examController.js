const MarkEntry = require('../models/MarkEntry');
const UnfairMeansCase = require('../models/UnfairMeansCase');

// ➡️ Marks CRUD
exports.addMarks = async (req, res) => {
  const markEntry = new MarkEntry(req.body);
  await markEntry.save();
  res.status(201).json({ message: "Marks added successfully!", markEntry });
};

exports.getMarksByStudent = async (req, res) => {
  const marks = await MarkEntry.find({ studentId: req.params.studentId }).populate('subjectId');
  res.json({ marks });
};

exports.updateMarks = async (req, res) => {
  const updated = await MarkEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Marks updated!", updated });
};

exports.deleteMarks = async (req, res) => {
  await MarkEntry.findByIdAndDelete(req.params.id);
  res.json({ message: "Marks deleted!" });
};

// ➡️ Ranker Analysis
exports.getRankList = async (req, res) => {
  const rankList = await MarkEntry.aggregate([
    { $group: {
        _id: "$studentId",
        totalObtained: { $sum: "$marksObtained" },
        totalMarks: { $sum: "$totalMarks" }
    }},
    { $project: {
        studentId: "$_id",
        percentage: { $multiply: [{ $divide: ["$totalObtained", "$totalMarks"] }, 100] }
    }},
    { $sort: { percentage: -1 } }
  ]);
  res.json({ rankList });
};

// ➡️ Unfair Means CRUD
exports.reportUnfairMeans = async (req, res) => {
  const caseEntry = new UnfairMeansCase(req.body);
  await caseEntry.save();
  res.status(201).json({ message: "Unfair means case reported!", caseEntry });
};

exports.getUnfairCases = async (req, res) => {
  const cases = await UnfairMeansCase.find().populate('studentId subjectId');
  res.json({ cases });
};

exports.updateUnfairCase = async (req, res) => {
  const updated = await UnfairMeansCase.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Case updated!", updated });
};

exports.deleteUnfairCase = async (req, res) => {
  await UnfairMeansCase.findByIdAndDelete(req.params.id);
  res.json({ message: "Case deleted!" });
};
