const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  pictureURL: {
    type: Object,
  },
  age: {
    type: String,
  },
  cultural_background: {
    type: String,
  },
  goals: {
    type: String,
  },
  bio: {
    type: String,
  },
  liked: {
    type: Array,
  },
  disliked: {
    type: Array,
  },
});

module.exports = mongoose.model("User", UserSchema);
