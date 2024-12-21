const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/', attendanceController.getAllAttendance);

router.get('/user/:userId', attendanceController.getAttendanceByUser);

router.post('/', attendanceController.markAttendance);

router.put('/:id', attendanceController.updateAttendance);

module.exports = router;