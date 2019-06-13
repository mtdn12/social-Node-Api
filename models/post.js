const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
    minlength: 4,
    maxlength: 150
  },
  body: {
    type: String,
    required: "Body is required",
    minlength: 4,
    maxlength: 3000
  },
  created: {
    type: Date,
    default: Date.now
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  postedBy: {
    type: ObjectId,
    ref: "Users"
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Post", postSchema);
