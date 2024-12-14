const Sequelize = require('sequelize')

module.exports = new Sequelize('lab5_postgres', 'user', 'password', {
  host: 'lab5_postgres',
  port: 5432,
  dialect: 'postgres'
});
