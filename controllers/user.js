const User = require("../models/user");
const _ = require("lodash");

const userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error();
    }
    req.profile = user; // adds profile object in req with user info
    next();
  } catch (error) {
    return res.status(400).json({
      error: "User not found"
    });
  }
};

const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action"
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id name email created updated");
    return res.status(200).json({
      items: users
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

const getUser = (req, res) => {
  const { name, email, _id, updated, created } = req.profile;
  const user = {
    name,
    email,
    _id,
    updated,
    created
  };
  return res.status(200).json({
    item: user
  });
};

const updateUser = async (req, res, next) => {
  try {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    const saveUser = await user.save();
    if (!saveUser) throw new Error();
    const { name, email, updated, created, _id } = saveUser;
    return res.status(200).json({
      result: "success",
      message: "Update user success",
      user: { name, email, updated, created, _id }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      result: "fail",
      error: "Could not update user info"
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    let user = req.profile;
    const isRemove = await user.remove();
    if (!isRemove) throw new Error();
    return res.status(200).json({
      result: "success",
      message: "Delete user success"
    });
  } catch (error) {
    return res.status(400).json({
      result: "fail",
      error: "Could not delete user"
    });
  }
};

module.exports = {
  userById,
  hasAuthorization,
  allUsers,
  getUser,
  updateUser,
  deleteUser
};
