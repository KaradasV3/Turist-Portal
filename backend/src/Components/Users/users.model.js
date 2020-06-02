import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9\s]+$/,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 250,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
  },

  name: {
    type: String,
    minlength: 2,
    required: true,
  },

  surname: {
    type: String,
    minlength: 2,
    required: true,
  },
});

const User = mongoose.model("User", schema);

export default User;
