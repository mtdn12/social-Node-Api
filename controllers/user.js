const User = require("../models/user");

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

module.exports = {
  userById
};
