const express = require('express')
const categorieController = require('../controllers/categorieController')
const categorieRouter = express.Router();

categorieRouter.get('/', categorieController.findAll);
categorieRouter.get('/:id', categorieController.findOne);
categorieRouter.post('/', categorieController.create);
categorieRouter.put('/:id', categorieController.update);
categorieRouter.delete('/:id', categorieController.destroy);

module.exports = categorieRouter