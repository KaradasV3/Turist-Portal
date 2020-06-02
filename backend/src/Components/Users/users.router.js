import express from "express";
import usersController from "./users.controler.js";

const usersRouter = express.Router();

usersRouter.get("/users", usersController.getUsers);
usersRouter.get("/user/:userId", usersController.getUser);

usersRouter.post("/user", usersController.addUser);
usersRouter.post("/user/auth/login", usersController.authenticateUser);
usersRouter.post("/user/auth/verify", usersController.verifyToken);
usersRouter.delete("/user/:userId", usersController.deleteUser);

export default usersRouter;