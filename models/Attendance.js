const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Institute = require('./Institute');

const Attendance = sequelize.define(
  'Attendance',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    instituteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Institute,
        key: 'id',
      },
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
  },
  {
    timestamps: true,
    uniqueKeys: {
      uniqueAttendance: {
        fields: ['userId', 'instituteId', 'date'],
      },
    },
  }
);

// Associations
Attendance.belongsTo(User, { as: 'Users', foreignKey: 'userId' });
User.hasMany(Attendance, { as: 'Attendances', foreignKey: 'userId' });

Attendance.belongsTo(Institute, { as: 'Institute', foreignKey: 'instituteId' });
Institute.hasMany(Attendance, { as: 'Attendances', foreignKey: 'instituteId' });

module.exports = Attendance;
