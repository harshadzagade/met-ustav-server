const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');

const Event = sequelize.define('Event', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fromTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  toTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aboutEvent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contactPerson: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  banner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  addBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updateBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define associations
Event.belongsTo(Category, { foreignKey: 'categoryId', allowNull: false }); // An Event belongs to a Category
Category.hasMany(Event, { foreignKey: 'categoryId' }); // A Category can have multiple Events

module.exports = Event;
