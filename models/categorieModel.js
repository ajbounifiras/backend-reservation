const mongoose=require('mongoose')




var categorie=mongoose.Schema({
    id:String,
    name:String,
    description:String,
    image:String,

})
var Categorie = mongoose.model('Categorie', categorie )
module.exports = Categorie;