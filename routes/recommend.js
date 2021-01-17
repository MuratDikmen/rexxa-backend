const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Therapist = require("../models/Therapist");

router.get("/", auth, async (req, res) => {
  console.log("hello");
  console.log(req.user);
  const { id } = req.user;
  const user = await User.findById(id);
  let unSeenTherapists = [];
  let randomTherapist;
  const unSeenTherapistsQuery = await Therapist.find({ _id: { $nin: user.seen } }, (err, therapists) => {
    if (therapists.length === 0) {
      res.json({ err: "no more suggestions" });
    }
    therapists.forEach((t) => unSeenTherapists.push(t));
    randomTherapist = unSeenTherapists[Math.floor(Math.random() * unSeenTherapists.length)];
    console.log(randomTherapist);
    user.seen.push(randomTherapist._id);
  }).select("-password");
  await user.save();
  res.json({ randomTherapist });
});

router.put("/:type", auth, async (req, res) => {
  const { id } = req.user;
  const { therapistId } = req.body;
  const user = await User.findById(id);
  if (req.params.type === "like") {
    user.liked_profiles.push(therapistId);
  } else {
    user.disliked_profiles.push(therapistId);
  }
  user.seen.push(therapistId);
  await user.save();
  console.log(user.liked_profiles);
  res.json({ msg: "success" });
});

module.exports = router;
