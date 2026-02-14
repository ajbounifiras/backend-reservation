const mongoose=require('mongoose')




var checkout=mongoose.Schema({
    id:String,
    firstName:String,
    lastName:String,
    streetAddress:String,
    City:String,
    phoneNumber:Number,
    email:String,
    note:String,
    cardNumber:Number,
    fullName:String,
    expiryDate:Date,
    cvv:String,
    totalPrice:Number
   

})
var Checkout = mongoose.model('Checkout', checkout )
module.exports = Checkout;