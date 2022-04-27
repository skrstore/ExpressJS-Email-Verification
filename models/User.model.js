const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    token: String,
    password: String,
    verified: {
      type: Boolean,
      default: false
    }
  })
);

module.exports = User;
