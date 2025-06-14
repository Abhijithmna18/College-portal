const router = require('express').Router();
const staffController = require('../controllers/staffController');

// Staff Records
router.post('/add', staffController.addStaff);
router.get('/all', staffController.getStaffs);
router.get('/:id', staffController.getStaffById);
router.put('/update/:id', staffController.updateStaff);
router.delete('/delete/:id', staffController.deleteStaff);

// Payroll
router.get('/payroll/report', staffController.getPayrollReport);

// Performance
router.put('/performance/:id', staffController.updatePerformance);

module.exports = router;
