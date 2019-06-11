const User = require("../models/user");
require("dotenv").config();
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const userExists = await User.findOne({
      email: req.body.email
    });
    if (userExists) {
      return res.status(403).json({
        result: "fail",
        error: "Email is taken!"
      });
    }
    const user = new User(req.body);
    const saveUser = await user.save();
    if (!saveUser) {
      return res.status(400).json({
        result: "fail",
        error: "Could not signup user"
      });
    }
    return res.status(200).json({
      result: "success",
      message: "Signup success"
    });
  } catch (error) {
    return res.status(400).json({
      result: "fail",
      error: error.message
    });
  }
};

const signin = async (req, res) => {
  try {
    const { password, email } = req.body;
    // Find the user based on email
    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(404).json({
        result: "fail",
        error: "Could not foud any user match that email"
      });
    }
    // If user, authenticate
    if (!user.authenticate(password)) {
      return res.status(401).json({
        result: "fail",
        error: "Email and password do not match"
      });
    }
    // Generate a token with user id and secrete
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, {
      expire: new Date() + 9999
    });
    // return response with user and token
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(400).json({
      result: "success",
      result: "fail",
      error: error.message
    });
  }
};

// Signout
const signout = async (req, res) => {
  try {
    res.clearCookie("t");
    res.status(200).json({
      message: "Signout success!"
    });
  } catch (error) {}
};

const requireSignin = expressJwt({
  // If the token is valid , express jwt appends the verified users id in an auth key
  // to the request object
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});

module.exports = {
  signup,
  signin,
  signout,
  requireSignin
};
