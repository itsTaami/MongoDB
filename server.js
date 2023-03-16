const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();
const connectDB = require("./config/mongodb");

const PORT = process.env.PORT;
const dbURL = process.env.DATABASE_URI;

//Instance of express
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
connectDB(dbURL);
app.listen(PORT, () => {
  console.log(`The Server is turned on at ${PORT}`.blue);
});
