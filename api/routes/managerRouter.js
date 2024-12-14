const express = require('express');
const managerController = require('../controllers/managerController');

const router = express.Router()

router.route('/')
  .get(managerController.getAllManagers)
  .post(managerController.createManager)

router.route('/:id')
  .get(managerController.getManager)
  .patch(managerController.updateManager)
  .delete(managerController.deleteManager)

module.exports = router;