const mongoose=require('mongoose')
var Schema = mongoose.Schema;




var produit=mongoose.Schema({
    categorieId:
    {type: Schema.Types.ObjectId, ref: 'categories'}
  ,
    id:String,
    name:String,
    price:String,
    description:String,
    image:String,
})
 
var Produit=mongoose.model('Produit',produit)
module.exports=Produit;