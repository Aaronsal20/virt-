const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const userSchema = require('../models/user');



exports.signIn = async (req, res, next) => {
  console.log("exports.signIn ->  process.env.JWT_KEY",  process.env.JWT_KEY)
  let fetchedUser;
  userSchema.findOne({email: req.body.email })
  .then(user => {
    fetchedUser = user;
    if(!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    if (user.category != req.body.category) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    return bcrypt.compare(req.body.password, user.password)
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth Failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},"secret_this_should_be_longer",
    { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      userType: fetchedUser.category
    })
  }).catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  })
}

exports.register = async (req, res, next) => {
  const password = await bcrypt.hash(req.body.password, 10);
  const uId = mongoose.Types.ObjectId();

  console.log("exports.createUser -> uId", uId)
  const user = new userSchema({
    _id: uId,
    category: req.body.category,
    password: password,
    email: req.body.email,
  });
  const result = await user.save();
  console.log("exports.createUser -> result", result)

  res.status(201).json({
    message: 'User created',
    result: result
  });
}

