const express = require('express');
const jwt = require('jsonwebtoken');
//const { check, validationResult } = require('express-validator');
require('dotenv').config();
const cloudinary = require('cloudinary').v2
//const auth = require('../token/auth');

const User = require('../models/userModel');
// const check = check('firstname', 'firstname is required').not().isEmpty()

const registerUser = async(req, res, next) => {
  //get an new instance because this is for registration
   const user = new User(req.body);     
   //const {firstname, lastname, country, region, email, username } = user
   console.log(req.body);
   
   try{
    let findUser = await User.findOne({email: user.email})
    if(findUser) {
      return res.status(400).json({error: [{msg: "email already registered"}]})
    }
     //not upload(user.savedImage) here, it has to come from the req.body
     const result = await cloudinary.uploader.upload(req.body.savedImage)
     user.avatar_url = result.secure_url
     
     //this line does not work 
  
     await user.save()
  }
  catch(err){
    return next(err)
  }
  
  //separate avatar out to handle the storage to MongoDB
  //const { avatar, ...user } = body
    //this is only for testing
    //console.log (body)
 
  //const userNew = await User({ ...userData, avatar_url: result.secure_url })  
    
    //user info, no sensitive data shall be included
    const payload = {user: {id: user._id, email: user.email}}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 360000})   
    
    //res.sendStatus stops after the status being sent, does not send out json
    //next is not needed because res is already used to send out info we need
    res.status(200).json({token: token});
} 

module.exports = registerUser