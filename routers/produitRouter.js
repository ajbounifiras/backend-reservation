const express = require('express')
const produitController=require('../controllers/produitController')
const produitRouter=express.Router()

produitRouter.get('/',produitController.findAll)
produitRouter.get('/:id',produitController.findOne)
produitRouter.post('/',produitController.create)
produitRouter.put('/:id',produitController.update)
produitRouter.delete('/:id',produitController.destroy)

module.exports=produitRouter