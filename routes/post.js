const express = require("express");
const postController = require("../controllers/post");
const validators = require("../validators");

const router = express.Router();

router.get("/", postController.getPosts);

// Create post
router.post("/post", validators.createPostValidator, postController.createPost);

module.exports = router;
