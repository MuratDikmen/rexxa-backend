const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  user_type: {
    type: "String",
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
  liked_profiles: {
    type: Array,
  },
  disliked_profiles: {
    type: Array,
  },
  first_time_user: {
    type: Boolean,
  },
  preferences: {
    type: Array,
  },
  seen: {
    type: Array,
  },
});

module.exports = mongoose.model("User", UserSchema);
