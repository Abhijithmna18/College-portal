const router = require('express').Router();
const controller = require('../controllers/adminController');

// User Management
router.post('/user', controller.createUser);
router.get('/users', controller.getAllUsers);
router.put('/user/:id', controller.updateUser);
router.delete('/user/:id', controller.deleteUser);

// Activate/Deactivate
router.put('/user/:id/deactivate', controller.deactivateUser);
router.put('/user/:id/activate', controller.activateUser);

module.exports = router;
