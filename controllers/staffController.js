const Staff = require('../models/staff');

// ➡️ Create Staff Record
exports.addStaff = async (req, res) => {
  const staff = new Staff(req.body);
  await staff.save();
  res.status(201).json({ message: "Staff added!", staff });
};

// ➡️ Get All Staff
exports.getStaffs = async (req, res) => {
  const staffs = await Staff.find();
  res.json({ staffs });
};

// ➡️ Get Single Staff
exports.getStaffById = async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  res.json({ staff });
};

// ➡️ Update Staff
exports.updateStaff = async (req, res) => {
  const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Staff updated!", updated });
};

// ➡️ Delete Staff
exports.deleteStaff = async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ message: "Staff deleted!" });
};

// ➡️ Payroll: Get All Staff Salaries
exports.getPayrollReport = async (req, res) => {
  const payroll = await Staff.find({}, 'name email designation salary');
  res.json({ payroll });
};

// ➡️ Performance: Update Performance Notes
exports.updatePerformance = async (req, res) => {
  const staff = await Staff.findByIdAndUpdate(
    req.params.id,
    { performanceNotes: req.body.performanceNotes },
    { new: true }
  );
  res.json({ message: "Performance updated!", staff });
};
