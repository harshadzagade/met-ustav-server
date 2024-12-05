const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/allusers', authController.getAllUsers);
router.get('/:id', authController.getUser);

router.put('/:id', authController.updateUser);

router.delete('/:id', authController.deleteUser);

module.exports = router;