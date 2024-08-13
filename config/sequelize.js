// config/sequelize.js
const { Sequelize } = require('sequelize');
const { postgres } = require('./keys');

const sequelize = new Sequelize(
  postgres.database,
  postgres.user,
  postgres.password,
  {
    host: postgres.host,
    dialect: 'postgres',
    logging: false // Set to true if you want SQL queries to be logged
  }
);

module.exports = sequelize;
