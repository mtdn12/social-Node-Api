// Import model
const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      body: req.body.body
    };
    const post = new Post(data);
    const savePost = await post.save();
    if (!savePost) {
      return res.status(400).json({
        result: "fail",
        errror: "Fail to create a post"
      });
    }
    return res.status(200).json({
      result: "success",
      item: post
    });
  } catch (error) {
    return res.status(400).json({
      result: "fail",
      errror: error.message
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().select("_id title body createdAt");
    if (!posts) {
      return res.status(404).json({
        result: "fail",
        error: "Can't find any posts"
      });
    }
    return res.status(200).json({
      result: "success",
      items: posts
    });
  } catch (error) {
    return res.status(400).json({
      result: "fail",
      error: error.message
    });
  }
};

module.exports = {
  getPosts,
  createPost
};
