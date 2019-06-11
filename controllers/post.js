// Import model
const Post = require("../models/post");

const createPost = async (req, res) => {
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
};

const getPosts = async (req, res) => {
  let template =
    "<html><body><h1>Hello from node JS</h1> <h3>Welcome you goes here</h3></body></html>";
  res.send(template);
};

module.exports = {
  getPosts,
  createPost
};
