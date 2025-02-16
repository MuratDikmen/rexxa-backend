const mongoose = require("mongoose");
const db = process.env.MONGO_URI || require("config").get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("mongoDB connected");
  } catch (error) {
    console.log("asdasd");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
