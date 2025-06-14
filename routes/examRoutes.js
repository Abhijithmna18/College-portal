const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// ➡️ Marks routes
router.post('/marks', examController.addMarks);
router.get('/marks/student/:studentId', examController.getMarksByStudent);
router.put('/marks/:id', examController.updateMarks);
router.delete('/marks/:id', examController.deleteMarks);

// ➡️ Rank list
router.get('/ranklist', examController.getRankList);

// ➡️ Unfair Means routes
router.post('/unfair', examController.reportUnfairMeans);
router.get('/unfair', examController.getUnfairCases);
router.put('/unfair/:id', examController.updateUnfairCase);
router.delete('/unfair/:id', examController.deleteUnfairCase);

module.exports = router;
