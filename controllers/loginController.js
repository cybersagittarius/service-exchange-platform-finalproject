const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");

const loginUser = async (req, res, next) => {

  console.log(req.body);

  const [email, password] = [req.body.email, req.body.password];

  const user = { email, password };

  console.log(user)

  // const user = new User(req.body)
  // const { email, password } = user

  try {
    let findUser = await User.findOne({ email: user.email });
    if (!findUser) {
      return res.status(400).json({ errors: [{ msg: "no user found!" }] });
    }
    if (findUser) {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Passwords" }] });
      }
    }
  } catch (err) {
    //next(err.message) only give us error message without the error detail
    return next(err);
  }
  const payload = { user: { id: user._id, email: user.email } };

  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  res.status(200).json({ token, email, msg: "Welcome back!" });
};

module.exports = loginUser;

//const { email, password } = req.body

// User.findOne({email: email}).exec((err, user)=> {
//         if(err){
//             res.status(500).send("Connection Error")
//         }else if(!user){
//                 console.log('No matching email in our db!');
//                 res.status(400).send("No user with this email registered")
//             }else{
//                 user.comparePassword(password, async (matchError, isMatch)=>{
//                     if(matchError) {
//                         res.status(400).send("Email and password combination is wrong")
//                         }else if(!isMatch){
//                             res.status(400).send("Email and password combination is wrong")
//                             }else{
//                                 const payload = {user: {id: user._id, email: user.email}}

//                                 const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'10m'});

//                                 res.status(200).json({token,user, msg: "Welcome back!"})

//                             }
//                         }
//                     )}
//                 })
//             }
