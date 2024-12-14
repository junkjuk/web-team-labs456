const PostgresCrud = require('../utils/postgresCrud');
const Car = require('../models/carModel');

const carCrud = new PostgresCrud(Car, 'Car');

exports.createCar = carCrud.create();
exports.getCar = carCrud.get();
exports.getAllCars = carCrud.getAll();
exports.updateCar = carCrud.update();
exports.deleteCar = carCrud.delete();