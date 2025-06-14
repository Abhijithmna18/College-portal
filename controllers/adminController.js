const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ➡️ Create user (Admin use)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hash, role });
    await user.save();

    res.status(201).json({ message: "User created!", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➡️ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➡️ Update user (including role)
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!updated) return res.status(404).json({ message: "User not found!" });
    res.json({ message: "User updated!", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➡️ Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found!" });
    res.json({ message: "User deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➡️ Deactivate user (block access)
exports.deactivateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true }).select('-password');
    if (!updated) return res.status(404).json({ message: "User not found!" });
    res.json({ message: "User deactivated!", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➡️ Activate user
exports.activateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true }).select('-password');
    if (!updated) return res.status(404).json({ message: "User not found!" });
    res.json({ message: "User activated!", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
