const express=require('express')
const userController=require('../controllers/userController')
const userRouter=express.Router()
const verif = require('../middleware/verifAuth')

userRouter.get('/',userController.findAll)
userRouter.get('/:id',userController.findOne)
userRouter.post('/register',userController.register)
userRouter.put('/:id',userController.update)
userRouter.delete('/:id',userController.destroy)
userRouter.post('/login',userController.login)
userRouter.get('/username/:userName',userController.findByUserName)
module.exports=userRouter;