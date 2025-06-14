const express = require('express');
const router = express.Router();
const feeController = require('../controllers/feeController');

// ➡️ Fee Structure routes
router.post('/feestructure', feeController.addFeeStructure);
router.get('/feestructure', feeController.getFeeStructures);
router.put('/feestructure/:id', feeController.updateFeeStructure);
router.delete('/feestructure/:id', feeController.deleteFeeStructure);

// ➡️ Fee Payment routes
router.post('/payment', feeController.makePayment);
router.get('/payment/student/:studentId', feeController.getPaymentsByStudent);
router.put('/payment/:id', feeController.updatePayment);
router.delete('/payment/:id', feeController.deletePayment);

// ➡️ Fee Report
router.get('/feereport/:studentId', feeController.getFeeReport);

module.exports = router;
