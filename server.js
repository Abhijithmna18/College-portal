const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const admissionRoutes = require('./routes/admissionRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const formRoutes = require('./routes/formRoutes');
const courseRoutes = require('./routes/course.routes');
const batchRoutes = require('./routes/batch.routes');
const examRoutes = require('./routes/examRoutes');
const feeRoutes = require('./routes/feeRoutes');
const attendanceLeaveRoutes = require('./routes/attendanceLeaveRoutes');
const adminRoutes = require('./routes/adminRoutes');
const staffRoutes = require('./routes/staffRoutes');



dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api', examRoutes);
app.use('/api', feeRoutes);
app.use('/api', attendanceLeaveRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);


// 📄 PDF Generation Route (Public Routes Only)
app.get('/api/docs/pdf', (req, res) => {
  generateRoutesPDF(res);
});

// Static Files (e.g. uploads)
app.use('/uploads', express.static('uploads'));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Root Endpoint
app.get('/', (req, res) => {
  res.send('College Management Portal Backend Running 🚀');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
