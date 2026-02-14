const express = require('express')
const cpController = require('../controllers/commande_produitController')
const cpRouter = express.Router();

cpRouter.get('/', cpController.findAll);
cpRouter.get('/byCommande/:checkouId', cpController.findByCommande);
cpRouter.post('/add', cpController.create);

cpRouter.delete('/:id', cpController.destroy);

module.exports = cpRouter