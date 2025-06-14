const FeeStructure = require('../models/FeeStructure');
const FeePayment = require('../models/FeePayment');
const mongoose = require('mongoose');

// ➡️ Fee Structure CRUD
exports.addFeeStructure = async (req, res) => {
  try {
    const fee = new FeeStructure(req.body);
    await fee.save();
    res.status(201).json({ message: "Fee structure added!", fee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFeeStructures = async (req, res) => {
  try {
    const fees = await FeeStructure.find().populate('courseId');
    res.json({ fees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFeeStructure = async (req, res) => {
  try {
    const updated = await FeeStructure.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Fee structure not found!" });
    res.json({ message: "Fee structure updated!", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFeeStructure = async (req, res) => {
  try {
    const deleted = await FeeStructure.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Fee structure not found!" });
    res.json({ message: "Fee structure deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➡️ Fee Payment CRUD
exports.makePayment = async (req, res) => {
  try {
    const payment = new FeePayment(req.body);
    await payment.save();
    res.status(201).json({ message: "Payment successful!", payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPaymentsByStudent = async (req, res) => {
  try {
    const payments = await FeePayment.find({ studentId: req.params.studentId })
                                     .populate('feeStructureId');
    res.json({ payments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const updated = await FeePayment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Payment not found!" });
    res.json({ message: "Payment updated!", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const deleted = await FeePayment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Payment not found!" });
    res.json({ message: "Payment deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➡️ Fee Report (total paid + pending)
exports.getFeeReport = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Validate studentId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID!" });
    }

    const totalDueResult = await FeeStructure.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalPaidResult = await FeePayment.aggregate([
      { $match: { studentId: new mongoose.Types.ObjectId(studentId) } },
      { $group: { _id: null, paid: { $sum: "$amountPaid" } } }
    ]);

    const totalFee = totalDueResult[0]?.total || 0;
    const paid = totalPaidResult[0]?.paid || 0;

    res.json({
      totalFee,
      paid,
      pending: totalFee - paid
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
