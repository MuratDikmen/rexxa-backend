const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");
const cors = require("cors");

const app = express();

// Connect to database
connectDB();

// Initialize middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/therapists", require("./routes/therapists"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/recommend", require("./routes/recommend"));

app.get("/", async (req, res) => {
  res.send("Back end is working!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is listening to ${PORT}`));
