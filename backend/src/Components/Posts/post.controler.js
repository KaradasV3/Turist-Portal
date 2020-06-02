import Post from "./Post.model.js";

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author")
      .populate("comments");
    res.json(posts);
  } catch (ex) {
    next(ex);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate("comments");
    res.json(post);
  } catch (ex) {
    next(ex);
  }
};

const addPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);

    const newSavedPost = await newPost.save();
    res.json(newSavedPost);
  } catch (ex) {
    next(ex);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
    });
    res.json(updatedPost);
  } catch (ex) {
    next(ex);
  }
};

const deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.json({ message: "Post deleted successfully" });
  } catch (ex) {
    next(ex);
  }
};

export default { getPosts, getPost, addPost, updatePost, deletePost };
