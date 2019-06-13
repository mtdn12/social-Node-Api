const express = require("express");
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validators");

const router = express.Router();

router.get("/posts", getPosts);

router.get("/posts/by/:userId", requireSignin, postByUser);
// Create post
router.post("/post", requireSignin, createPost, createPostValidator);
// Delete post
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
// Update POst
router.put("/post/:postId", requireSignin, isPoster, updatePost);
// Any route containing :userId , our app will first execute userByID()

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
