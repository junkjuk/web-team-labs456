const { DataTypes } = require('sequelize');
const sequelize = require('../postgresCon');

const Car = sequelize.define(
  'CAR',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    car_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    condition: {
      type: DataTypes.ENUM,
      values: ['bad', 'ok', 'good', 'mint'],
      defaultValue: 'ok'
    },
    image_blob: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    image_blob_mime_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      default: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      default: DataTypes.NOW
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: 'car'
  }
)

module.exports = Car;
