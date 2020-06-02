import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./users.model.js";


const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (ex) {
    next(ex);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (ex) {
    next(ex);
  }
};

const addUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);

    // We are encrypting passwords here
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const newSavedUser = await newUser.save();
    res.json(newSavedUser);
  } catch (ex) {
    next(ex);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const passwordIsCorrect = await bcrypt.compare(req.body.password, user.password);

    if (passwordIsCorrect) {
      await User.findByIdAndDelete(req.params.userId);
      res.json({ message: "User deleted successfully" });
    } else {
      throw new Error("Incorrect password");
    }
  } catch (ex) {
    next(ex);
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new Error("Incorrect username");

    const passwordIsCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsCorrect) throw new Error("Incorrect password");

    //const privateKey = process.env.PRIVATE_KEY_FOR_TOKENS;
    //const token = jwt.sign({}, privateKey, { expiresIn: "7 days" });

    res.json({ user });
  } catch (ex) {
    next(ex);
  }
};

const verifyToken = async (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.PRIVATE_KEY_FOR_TOKENS);
    res.json({ valid: true });
  } catch (ex) {
    res.json({ valid: false });
  }
};

export default { getUsers, getUser, addUser, deleteUser, authenticateUser, verifyToken };
