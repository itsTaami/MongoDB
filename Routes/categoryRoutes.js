const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");

const router = express.Router();
router.route("/").post(createCategory).get(getAllCategory);

router
  .route("/:id")
  .get(getCategory)
  .post(updateCategory)
  .delete(deleteCategory);
module.exports = router;
