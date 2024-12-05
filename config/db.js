const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('met_utsav', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;