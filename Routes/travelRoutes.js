const express = require("express");
const {
  createTravel,
  getAllTravel,
  getTravel,
  updateTravel,
  deleteTravel,
} = require("../controller/travel");

const router = express.Router();
router.route("/").post(createTravel).get(getAllTravel);

router.route("/:id").get(getTravel).post(updateTravel).delete(deleteTravel);
module.exports = router;
