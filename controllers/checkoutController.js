const CheckoutModel = require('../models/checkoutModel')

// Create and Save a new checkout
exports.create = async (req, res) => {
    
    console.log(req.body)
    const checkout = new CheckoutModel(req.body)
  
    
    await checkout.save().then(data => {
        res.send({
            message:"checkout created successfully!!",
            checkout:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating checkout"
        });
    });
};

// find  all checkouts from the database.
exports.findAll = async (req, res) => {
    try {
        const checkout = await CheckoutModel.find();
        res.status(200).json(checkout);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single checkout with an id
exports.findOne = async (req, res) => {
    try {
        const checkout = await CheckoutModel.findById(req.params.id);
        res.status(200).json(checkout);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a checkout by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await CheckoutModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `checkout not found.`
            });
        }else{
            res.send({ message: "checkout updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a checkout with the specified id in the request
exports.destroy = async (req, res) => {
    await CheckoutModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `checkout not found.`
          });
        } else {
          res.send({
            message: "checkout deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};