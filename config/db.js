const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('met_utsav', 'postgres', 'root', {
  host: '192.168.4.39',
  dialect: 'postgres',
  logging: false,
  port: 5432
});

module.exports = sequelize;