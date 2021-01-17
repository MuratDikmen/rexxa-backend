const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Therapist = require("../models/Therapist");

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
      let therapist = await Therapist.findOne({ email });

      if (therapist) {
        return res.status(400).json({ msg: "User already exists." });
      }

      therapist = new Therapist({ email, password, user_type: "therapist", first_time_user: true });
      const salt = await bcrypt.genSalt(10);
      therapist.password = await bcrypt.hash(therapist.password, salt);

      await therapist.save();
      const payload = {
        user: {
          id: therapist.id,
          userType: "therapist",
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

module.exports = router;
