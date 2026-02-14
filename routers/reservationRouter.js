const express=require('express')
const reservationController=require('../controllers/reservationController')
const reservationRouter=express.Router()


reservationRouter.get('/',reservationController.findAll)
reservationRouter.get('/:id',reservationController.findOne)
reservationRouter.post('/',reservationController.create)
reservationRouter.put('/:id',reservationController.update)
reservationRouter.delete('/:id',reservationController.destroy)

module.exports=reservationRouter;