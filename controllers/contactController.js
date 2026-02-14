const ContactModel = require('../models/contactModel')

// Create and Save a new contact
exports.create = async (req, res) => {
    if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.subject && !req.body.message) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const contact = new ContactModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message

    });
    
    await contact.save().then(data => {
        res.send({
            message:"contact created successfully!!",
            contact:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating contact"
        });
    });
};

// find  all contacts from the database.
exports.findAll = async (req, res) => {
    try {
        const contact = await ContactModel.find();
        res.status(200).json(contact);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single contact with an id
exports.findOne = async (req, res) => {
    try {
        const contact = await ContactModel.findById(req.params.id);
        res.status(200).json(contact);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a contact by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await ContactModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `contact not found.`
            });
        }else{
            res.send({ message: "contact updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a contact with the specified id in the request
exports.destroy = async (req, res) => {
    await ContactModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `contact not found.`
          });
        } else {
          res.send({
            message: "contact deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};