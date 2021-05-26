const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
  'demo',
  'root',
  '123456',
  {
    host: 'localhost',
    dialect: 'mysql',
  },
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
)
module.exports = sequelize