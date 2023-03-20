const mongoose = require("mongoose");

// const DATABASE_URI = process.env.DATABASE_URI;

const connectDB = async (dbURL) => {
  try {
    // console.log(dbURL);
    await mongoose.connect(dbURL);
    console.log("connected to MongoDB ");
  } catch (err) {
    console.log("An error occured while connecting to MongoDB: ", err);
  }
};

module.exports = connectDB;
