const mongoose = require("mongoose");

const TherapistSchema = mongoose.Schema({
  name: {
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
  practice_type: {
    type: String,
  },
  cultural_background: {
    type: String,
  },
  specialty_areas: {
    type: Array,
  },
  bio: {
    type: String,
  },
  liked_by: {
    type: Array,
  },
  liked_by_profiles: {
    type: Array,
  },
  first_time_user: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Therapist", TherapistSchema);
