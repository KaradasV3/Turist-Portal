import express from "express";
import postController from "./post.controler.js";

const postsRouter = express.Router();

postsRouter.get("/posts", postController.getPosts);
postsRouter.get("/post/:postId", postController.getPost);

postsRouter.post("/post", postController.addPost);
postsRouter.patch("/post/:postId", postController.updatePost);
postsRouter.delete("/post/:postId", postController.deletePost);

export default postsRouter;
