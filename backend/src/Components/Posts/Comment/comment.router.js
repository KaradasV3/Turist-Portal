import express from "express";
import commentController from "./comment.controler.js";

const commentRouter = express.Router();

commentRouter.get("/comments", commentController.getComments);
commentRouter.get("/comment/:commentId", commentController.getComment);

commentRouter.post("/comment", commentController.addComment);
commentRouter.delete("/comment/:commentId", commentController.deleteComment);

export default commentRouter;
