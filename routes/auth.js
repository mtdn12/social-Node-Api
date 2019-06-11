const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator } = require("../validators");

const router = express.Router();

// Signup
router.post("/signup", userSignupValidator, signup);
// Signin
router.post("/signin", signin);
// Sign out
router.post("/signout", signout);

// Any route containing :userId , our app will first execute userByID()

router.param("userId", userById);

module.exports = router;
