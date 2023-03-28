const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/mongodb");
const logger = require("./middlewares/logger");
const upload = require("./middlewares/upload");
const cloudinary = require("./utils/cloudinary");
const error = require("./middlewares/error");

const userRoutes = require("./Routes/userRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const travelRoutes = require("./Routes/travelRoutes");

dotenv.config();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     // console.log("FILE:", file);
//     const fileExt = path.extname(file.originalname);
//     // console.log("FS:", fileExt);
//     const fileName = Math.floor(Math.random() * 1_000_000).toString(16);
//     // console.log("Fn:", fileName);
//     cb(null, `${fileName}${fileExt}`);
//   },
// });
// const upload = multer({ storage: storage });

const PORT = process.env.PORT;
const dbUrl = process.env.DATABASE_URI;

//Instance of express
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/uploads", express.static("uploads"));

//Routes

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/travel", travelRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log("req:", req.file);
  const result = await cloudinary.uploader.upload(req.file.path);
  res.status(200).json({
    message: "Saved successfully",
    imgUrl: result.secure_url,
    // imgUrl: `${req.protocol}://${req.hostname}:${PORT}/${req.file.path}`,
  });
});
console.log(`-----------------------------------------`.yellow);

app.use(error);
connectDB(dbUrl);

app.listen(PORT, () => {
  console.log(`The Server is turned on at ${PORT}`.blue);
});
