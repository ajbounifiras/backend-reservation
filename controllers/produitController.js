const ProduitModel=require('../models/produitModel')

// Create and Save a new produit
exports.create = async (req, res) => {
    if (!req.body.name && !req.body.description && !req.body.price) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const produit = new ProduitModel({
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        image:req.body.image,
        categorieId:req.body.categorieId,

    });
    
    await produit.save().then(data => {
        res.send({
            message:"produit created successfully!!",
            produit:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating produit"
        });
    });
};

// find  all produits from the database.
exports.findAll = async (req, res) => {
    try {
        const produit = await ProduitModel.find();
        res.status(200).json(produit);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single produit with an id
exports.findOne = async (req, res) => {
    try {
        const produit = await ProduitModel.findById(req.params.id);
        res.status(200).json(produit);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a produit by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await ProduitModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `produit not found.`
            });
        }else{
            res.send({ message: "produit updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a produit with the specified id in the request
exports.destroy = async (req, res) => {
    await ProduitModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `produit not found.`
          });
        } else {
          res.send({
            message: "produit deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};