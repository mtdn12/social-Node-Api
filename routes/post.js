const express = require("express");
const { getPosts, createPost } = require("../controllers/post");
const { createPostValidator } = require("../validators");

const router = express.Router();

router.get("/", getPosts);

// Create post
router.post("/post", createPostValidator, createPost);

module.exports = router;
