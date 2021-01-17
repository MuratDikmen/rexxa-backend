const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const { update } = require("../models/User");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists." });
      }

      user = new User({ email, password, user_type: "user", first_time_user: true });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();
      const payload = {
        user: {
          id: user.id,
          userType: "user",
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
);

// @route   PUT api/users
// @desc    Update user
// @access  Private

router.put("/:id", auth, async (req, res) => {
  const { _id, firstname, lastname, age, gender, preferences } = req.body;

  const updateFields = {};

  updateFields.firstname = firstname;
  updateFields.lastname = lastname;
  updateFields.age = age;
  updateFields.gender = gender;
  updateFields.preferences = preferences;
  updateFields.first_time_user = false;

  try {
    let user = await User.findByIdAndUpdate(
      _id,
      {
        $set: updateFields,
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
