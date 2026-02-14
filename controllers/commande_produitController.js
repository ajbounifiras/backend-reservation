const CpModel = require('../models/commande_produit')
// Create and Save a new checkout
exports.create = async (req, res) => {
    
    console.log(req.body)
    const cp = new CpModel(req.body)
  
    
    await cp.save().then(data => {
        res.send({
            message:"cp created successfully!!",
            CpModel:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating cp"
        });
    });
};

// find  all produits from the database.
exports.findAll = async (req, res) => {
    try {
        const cp = await CpModel.find();
        res.status(200).json(cp);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// find  all produits by commandefrom the database.
exports.findByCommande = async (req, res) => {
    try {
        const cp = await CpModel.find({ checkoutId: req.params.checkouId }).exec();
        res.status(200).json(cp);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Delete a checkout with the specified id in the request
exports.destroy = async (req, res) => {
    await CpModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `cp not found.`
          });
        } else {
          res.send({
            message: "cp deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};