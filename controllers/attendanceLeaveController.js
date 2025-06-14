const Attendance = require('../models/Attendance');
const LeaveRequest = require('../models/LeaveRequest');
const mongoose = require('mongoose');

// ➡️ Attendance CRUD
exports.markAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json({ message: "Attendance marked!", attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendanceByUser = async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.params.userId });
    res.json({ records });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Attendance record not found!" });
    res.json({ message: "Attendance updated!", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Attendance record not found!" });
    res.json({ message: "Attendance deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➡️ Leave Requests CRUD
exports.requestLeave = async (req, res) => {
  try {
    const leave = new LeaveRequest(req.body);
    await leave.save();
    res.status(201).json({ message: "Leave request submitted!", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeaveRequestsByUser = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ userId: req.params.userId });
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const updated = await LeaveRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Leave request not found!" });
    res.json({ message: "Leave status updated!", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLeaveRequest = async (req, res) => {
  try {
    const deleted = await LeaveRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Leave request not found!" });
    res.json({ message: "Leave request deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

