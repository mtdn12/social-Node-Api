const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userSignupValidator } = require("../validators");

const router = express.Router();

// Signup
router.post("/signup", userSignupValidator, signup);
// Signin
router.post("/signin", signin);
// Sign out
router.post("/signout", signout);

module.exports = router;
