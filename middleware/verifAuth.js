const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel=require('../models/userModel')
  //verifToken
const verif =async (req, res, next) => {
    const token = req.headers.authorization
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try{
    const userName = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await userModel.findOne({ userName: userName }); 
    }catch(err){
        return  res.status(400).send("user not valid");
    }
    return next();
  };
  module.exports= verif;