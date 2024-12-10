const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
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
    defaultValue: Sequelize.NOW,
  },
  updateDate: {
    type: DataTypes.DATE,
    allowNull: true,
  }
});

module.exports = Category;
