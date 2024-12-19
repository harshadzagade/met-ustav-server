const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('met_utsav', 'postgres', 'root', {
  host: '192.168.4.39',
  dialect: 'postgres',
  logging: false,
  port: 5432
});

sequelize.authenticate().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;