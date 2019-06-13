// Import model
const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

const createPost = async (req, res, next) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded"
        });
      }
      let post = new Post(fields);
      post.postedBy = req.auth._id;
      if (files.photo) {
        post.photo.data = fs.readFileSync(files.photo.path);
        post.photo.contentType = files.photo.type;
      }
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
    console.log(req.auth);
    const posts = await Post.find()
      .populate("postedBy", "_id name email")
      .select("_id title body created");
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

const postByUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.profile._id })
      .populate("postedBy", "_id name email")
      .select("_id title body created")
      .sort("created");
    if (!posts) throw new Error();
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

const postById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id).populate("postedBy", "_id name");
    if (!post) throw new Error();
    req.post = post;
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = req.post;
    const isDelete = await post.remove();
    if (!isDelete) throw new Error();
    return res.status(200).json({
      result: "success",
      message: "Delete post success"
    });
  } catch (error) {
    return res.status(403).json({
      result: "fail",
      error: "You are not allow to perform this action"
    });
  }
};

const isPoster = async (req, res, next) => {
  try {
    let isPoster =
      req.post && req.auth && String(req.post.postedBy._id) === req.auth._id;
    if (!isPoster) throw new Error();
    next();
  } catch (error) {
    return res.status(403).json({
      result: "fail",
      error: "You are not allow to perform this action"
    });
  }
};

const updatePost = async (req, res) => {
  try {
    let post = req.post;
    post = _.extend(post, req.body);
    post.updated = Date.now();
    const postUpdated = await post.save();
    if (!postUpdated) throw new Error();
    return res.status(200).json({
      result: "success",
      item: postUpdated
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      result: "fail",
      error: "Could not update Post"
    });
  }
};

module.exports = {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost
};
