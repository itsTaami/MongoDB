const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const multer = require("multer");
const path = require("path");

const connectDB = require("./config/mongodb");
const logger = require("./logger/logger");

const userRoutes = require("./Routes/userRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const travelRoutes = require("./Routes/travelRoutes");

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // console.log("FILE:", file);
    const fileExt = path.extname(file.originalname);
    // console.log("FS:", fileExt);
    const fileName = Math.floor(Math.random() * 1_000_000).toString(16);
    // console.log("Fn:", fileName);
    cb(null, `${fileName}${fileExt}`);
  },
});
const upload = multer({ storage: storage });

const PORT = process.env.PORT;
const dbURL = process.env.DATABASE_URI;

//Instance of express
const app = express();

//middleware
app.use(express.json());
app.use(logger);
app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);
app.use("/category", categoryRoutes);
app.use("/travel", travelRoutes);

app.post("/upload", upload.single("image"), (req, res) => {
  console.log("req:", req.file);
  res.status(200).json({
    message: "Saved successfully",
    imgUrl: `${req.protocol}://${req.hostname}:${PORT}/${req.file.path}`,
  });
});
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
console.log(`-----------------------------------------`.yellow);
connectDB(dbURL);
app.listen(PORT, () => {
  console.log(`The Server is turned on at ${PORT}`.blue);
});
