const PostgresCrud = require('../utils/postgresCrud');
const CarOrder = require('../models/carOrderModel');

const carOrderCrud = new PostgresCrud(CarOrder, 'CarOrder');

exports.createCarOrder = carOrderCrud.create();
exports.getCarOrder = carOrderCrud.get();
exports.getAllCarOrders = carOrderCrud.getAll();
exports.updateCarOrder = carOrderCrud.update();
exports.deleteCarOrder = carOrderCrud.delete();
