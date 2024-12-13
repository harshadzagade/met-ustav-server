const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Institute = require('./Institute');

const Notice = sequelize.define('Notice', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    instituteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    addBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    updateBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    addDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updateDate: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}
);

Notice.belongsTo(Institute, { as: 'Institutes', foreignKey: 'instituteId' });
Institute.hasMany(Notice, { as: 'Notices', foreignKey: 'instituteId' });

module.exports = Notice;