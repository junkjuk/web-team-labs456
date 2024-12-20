const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router()

router.route('/')
  .get(clientController.getAllClients)
  .post(clientController.createClient)

router.route('/:id')
  .get(clientController.getClient)
  .patch(clientController.updateClient)
  .delete(clientController.deleteClient)

router.route('/name/:fullName')
    .get(clientController.filterByName)


module.exports = router;