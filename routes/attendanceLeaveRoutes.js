const router = require('express').Router();
const controller = require('../controllers/attendanceLeaveController');

// Attendance Routes
router.post('/attendance', controller.markAttendance);
router.get('/attendance/:userId', controller.getAttendanceByUser);
router.put('/attendance/:id', controller.updateAttendance);
router.delete('/attendance/:id', controller.deleteAttendance);

// Leave Requests Routes
router.post('/leave', controller.requestLeave);
router.get('/leave/:userId', controller.getLeaveRequestsByUser);
router.put('/leave/:id', controller.updateLeaveStatus);
router.delete('/leave/:id', controller.deleteLeaveRequest);

module.exports = router;
