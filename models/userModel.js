const mongoose=require('mongoose')

var user=mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    role:String
})

var User=mongoose.model('User',user)
module.exports=User;
