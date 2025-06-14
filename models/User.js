const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['student', 'faculty', 'staff', 'admin'], 
        default: 'student' 
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
// Convert role to lowercase before saving
userSchema.pre('save', function(next) {
    this.role = this.role.toLowerCase();
    next();
});

module.exports = mongoose.model('User', userSchema);
