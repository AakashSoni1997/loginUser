const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected on server");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
