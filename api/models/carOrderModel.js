const { DataTypes } = require('sequelize');
const sequelize = require('../postgresCon');

const Client = require('./clientModel');
const Car = require('./carModel');

const CarOrder = sequelize.define(
  'CarOrder', 
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    car_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: 'car_order'
  }
)

CarOrder.belongsTo(Car, { foreignKey: 'car_id' });
CarOrder.belongsTo(Client, { foreignKey: 'client_id' });
Car.hasMany(CarOrder, { foreignKey: 'car_id' });
Client.hasMany(CarOrder, { foreignKey: 'client_id' });

module.exports = CarOrder;
