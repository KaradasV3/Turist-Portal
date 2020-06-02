import mongoose from "mongoose";

const schema = new mongoose.Schema({
  commentAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  message: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
});

const Comment = mongoose.model("Comment", schema);

export default Comment;
