const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const connectDB = require("./config/mongodb");
const logger = require("./logger/logger");

const userRoutes = require("./Routes/userRoutes");
dotenv.config();

const PORT = process.env.PORT;
const dbURL = process.env.DATABASE_URI;

//Instance of express
const app = express();

app.use(express.json());
app.use(logger);

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
console.log(`-----------------------------------------`.yellow);
connectDB(dbURL);
app.listen(PORT, () => {
  console.log(`The Server is turned on at ${PORT}`.blue);
});
