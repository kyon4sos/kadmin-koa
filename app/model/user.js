const { DataTypes } = require('sequelize')
const sequelize = require('@/db/db.js')
const UserModel = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    salt:{
      type: DataTypes.STRING,
    }
  },
  {
    underscored: true,
    tableName: 'sys_user',
  }
)
module.exports = UserModel
