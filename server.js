const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();

// Connect to database
connectDB();

// Initialize middleware
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Back end is working!!");
  try {
    const user = new User({
      name: "Murat",
      expertise: "Child Development",
    });
    await user.save();
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is listening to ${PORT}`));
