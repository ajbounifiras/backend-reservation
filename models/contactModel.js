const mongoose=require('mongoose')

var contact=mongoose.Schema({
    id:String,
    firstName:String,
    LastName:String,
    email:String,
    subject:String,
    message:String
})

var Contact=mongoose.model('Contact',contact)
module.exports=Contact;