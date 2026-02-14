const reservationModel=require('../models/reservationModel')


exports.create = async (req, res) => {
   
    
    const Reservation = new reservationModel(req.body);
    
    await Reservation.save().then(data => {
        res.send({
            message:"Reservation created successfully!!",
            Reservation:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating Reservation"
        });
    });
};

// find  all Reservations from the database.
exports.findAll = async (req, res) => {
    try {
        const Reservation = await reservationModel.find();
        res.status(200).json(Reservation);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single Reservation with an id
exports.findOne = async (req, res) => {
    try {
        const Reservation = await reservationModel.findById(req.params.id);
        res.status(200).json(Reservation);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a Reservation by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await reservationModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Reservation not found.`
            });
        }else{
            res.send({ message: "Reservation updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a Reservation with the specified id in the request
exports.destroy = async (req, res) => {
    await reservationModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Reservation not found.`
          });
        } else {
          res.send({
            message: "Reservation deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};