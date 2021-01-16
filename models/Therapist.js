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
});

module.exports = mongoose.model("Therapist", TherapistSchema);
