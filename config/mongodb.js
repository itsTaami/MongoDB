const mongoose = require("mongoose");

// const DATABASE_URI = process.env.DATABASE_URI;

const connectDB = async (dbURL) => {
  try {
    // console.log(dbURL);
    const db = await mongoose.connect(dbURL);
    console.log(`Connected to MongoDB ${db.connection.host}`.magenta);
  } catch (err) {
    console.log("An error occured while connecting to MongoDB: ", err);
  }
};

module.exports = connectDB;
