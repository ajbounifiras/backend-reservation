const CategorieModel = require('../models/categorieModel')

// Create and Save a new categorie
exports.create = async (req, res) => {
    if (!req.body.name && !req.body.description) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    console.log(req.body)
    const categorie = new CategorieModel({
        name: req.body.name,
        description: req.body.description,
        image:req.body.image,
    });
    
    await categorie.save().then(data => {
        res.send({
            message:"categorie created successfully!!",
            categorie:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating categorie"
        });
    });
};

// find  all categories from the database.
exports.findAll = async (req, res) => {
    try {
        const categorie = await CategorieModel.find();
        res.status(200).json(categorie);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single categorie with an id
exports.findOne = async (req, res) => {
    try {
        const categorie = await CategorieModel.findById(req.params.id);
        res.status(200).json(categorie);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a categorie by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await CategorieModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `categorie not found.`
            });
        }else{
            res.send({ message: "categorie updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a categorie with the specified id in the request
exports.destroy = async (req, res) => {
    await CategorieModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `categorie not found.`
          });
        } else {
          res.send({
            message: "categorie deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};