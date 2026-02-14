const userModel=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
// access config var
process.env.TOKEN_SECRET;

exports.register = async (req, res) => {
    if (!req.body.userName && !req.body.email && !req.body.password ) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    let  newPassword = await bcrypt.hash(req.body.password,10);
    const  user = new userModel({
        userName: req.body.userName,
        email:req.body.email,
        password:newPassword,
        role:"user"
    });
    
    await user.save().then(data => {
        res.send({
            message:"user created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

// find  all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single user with an id
exports.findOne = async (req, res) => {
    try {
        
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await userModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `user not found.`
            });
        }else{
            res.send({ message: "user updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await userModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `user not found.`
          });
        } else {
          res.send({
            message: "user deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};
//generate token
exports.login = async (req, res)=> {
    
    const user = await userModel.findOne({ userName: req.body.userName });    
    if(user && (await bcrypt.compare(req.body.password, user.password))){
        let token = jwt.sign(req.body.userName, process.env.TOKEN_SECRET);
        return res.send({userName:user.userName,token: token, role: user.role});
    }else{
        res.status(400).send("Invalid user");
    }
}
exports.findByUserName = async (req, res) => {
        try {
            const user = await userModel.findOne({ userName: req.params.userName });
            return res.status(200).json(user);
        } catch(error) {
            res.status(404).json({ message: error.message});
        }
};

    

