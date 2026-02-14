const mongoose=require('mongoose')


var reservation=mongoose.Schema({
    name:String,
    persone:Number,
    phone:Number,
    email:String,
    date:Date,
    time:String,
    notes:String,
    etat:String,
})
var Reservation=mongoose.model('Reservation',reservation)
module.exports=Reservation;