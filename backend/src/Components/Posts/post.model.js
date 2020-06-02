import mongoose from "mongoose";

const schema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },

  cost: {
    type: String,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  picture: {
    type: String,
  },

  description: {
    type: String,
  },

  date: {
    type: Date,
  },

  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },

  accepted: {
    type: Boolean,
    required: true,
  },
});

const Post = mongoose.model("Post", schema);

export default Post;
