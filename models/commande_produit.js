const mongoose=require("mongoose")
var Schema = mongoose.Schema;

var cp=mongoose.Schema({
    checkoutId:
        {type: Schema.Types.ObjectId, ref: 'categorie'}
      ,
    produitId:
        {type: Schema.Types.ObjectId, ref: 'produit'}
        ,
    quantity:Number
    
})
var cp=mongoose.model('Commande_Produit',cp)
module.exports=cp;