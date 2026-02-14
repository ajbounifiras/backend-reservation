const express = require('express')
const checkoutController = require('../controllers/checkoutController')
const checkoutRouter = express.Router();

checkoutRouter.get('/', checkoutController.findAll);
checkoutRouter.get('/:id', checkoutController.findOne);
checkoutRouter.post('/', checkoutController.create);
checkoutRouter.put('/:id', checkoutController.update);
checkoutRouter.delete('/:id', checkoutController.destroy);

module.exports = checkoutRouter