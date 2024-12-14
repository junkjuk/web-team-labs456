const PostgresCrud = require('../utils/postgresCrud');
const Client = require('../models/clientModel');

const ClientCrud = new PostgresCrud(Client, 'Client');

exports.createClient = ClientCrud.create();
exports.getClient = ClientCrud.get();
exports.getAllClients = ClientCrud.getAll();
exports.updateClient = ClientCrud.update();
exports.deleteClient = ClientCrud.delete();
exports.filterByName = ClientCrud.getByFullName();
