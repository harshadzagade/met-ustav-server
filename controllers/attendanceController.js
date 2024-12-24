const Attendance = require('../models/Attendance');
const User = require('../models/User');

// Controller to handle attendance
const AttendanceController = {
    // Mark attendance
    markAttendance: async (req, res) => {
        try {
            const { userId, instituteId,  status, date, addby } = req.body;

            // // Validate required fields
            // if (!userId || !instituteId || !date || !addby) {
            //     return res.status(400).json({ message: 'userId, instituteId, date, and addby are required' });
            // }

            // Check if user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Create attendance record
            const attendance = await Attendance.create({
                userId,
                instituteId,
                status: status || 'absent',
                date,
                addby,
            });

            return res.status(201).json({ message: 'Attendance marked successfully', attendance });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Update attendance
    updateAttendance: async (req, res) => {
        try {
            const { id } = req.params;
            const { status, updateby } = req.body;

            // Find attendance record
            const attendance = await Attendance.findByPk(id);
            if (!attendance) {
                return res.status(404).json({ message: 'Attendance record not found' });
            }

            // Update fields
            attendance.status = status || attendance.status;
            attendance.updateby = updateby || attendance.updateby;

            await attendance.save();

            return res.status(200).json({ message: 'Attendance updated successfully', attendance });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Get attendance records by user
    getAttendanceByUser: async (req, res) => {
        try {
            const { userId } = req.params;

            // Find attendance records
            const attendanceRecords = await Attendance.findAll({
                where: { userId },
                include: [{ model: User, as: 'Users' }],
            });

            if (!attendanceRecords.length) {
                return res.status(404).json({ message: 'No attendance records found for this user' });
            }

            return res.status(200).json({ attendanceRecords });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Get all attendance records
    getAllAttendance: async (req, res) => {
        try {
            const attendanceRecords = await Attendance.findAll({
                include: [{ model: User, as: 'Users' }],
            });

            return res.status(200).json({ attendanceRecords });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = AttendanceController;
