const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Attendance = sequelize.define('Attendance', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'absent',
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    addby: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    updateby: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Attendance;