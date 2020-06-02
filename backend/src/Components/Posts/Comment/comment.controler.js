import Comment from "./comment.model.js";

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate("commentAuthor")
      .populate("post");
    res.json(comments);
  } catch (ex) {
    next(ex);
  }
};

const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.postId)
      .populate("commentAuthor")
      .populate("post");
    res.json(comment);
  } catch (ex) {
    next(ex);
  }
};

const addComment = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body);

    const newSavedComment = await newComment.save();
    res.json(newSavedComment);
  } catch (ex) {
    next(ex);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.postId);
    res.json({ message: "Post deleted successfully" });
  } catch (ex) {
    next(ex);
  }
};

export default { getComments, getComment, addComment, deleteComment };
