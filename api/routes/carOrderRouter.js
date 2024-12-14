const express = require('express');
const carOrderController = require('../controllers/carOrderController');

const router = express.Router()

router.route('/')
  .get(carOrderController.getAllCarOrders)
  .post(carOrderController.createCarOrder)

router.route('/:id')
  .get(carOrderController.getCarOrder)
  .patch(carOrderController.updateCarOrder)
  .delete(carOrderController.deleteCarOrder)

module.exports = router;