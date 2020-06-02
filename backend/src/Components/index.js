import express from "express";
import usersRouter from "./Users/users.router.js";
import postsRouter from "./Posts/post.router.js";
import commentRouter from "./Posts/Comment/comment.router.js";

const mainRouter = express.Router();
const componentRouters = [usersRouter, postsRouter, commentRouter];

mainRouter.use(componentRouters);

export { mainRouter as router };
