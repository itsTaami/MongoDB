const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  register,
} = require("../controller/user");

const { checkLogin, authorization } = require("../middlewares/auth");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/").post(createUser).get(getAllUsers, authorization("User"));

router
  .route("/:id")
  .get(getUser)
  .post(updateUser)
  .delete(deleteUser, authorization);
module.exports = router;
