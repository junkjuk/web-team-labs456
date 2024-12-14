const { DataTypes } = require('sequelize');
const sequelize = require('../postgresCon');

const Client = sequelize.define(
  'Client', 
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
    },
    sex: {
      type: DataTypes.ENUM,
      values: ['yes', 'no'],
      defaultValue: 'yes'
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: 'client'
  }
)

module.exports = Client;
