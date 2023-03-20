const User = require("../Model/User");

const getAllUsers = (req, res) => {};

const createUser = async (req, res) => {
  console.log(req.body);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(201).json({ message: "Successfully registered", user });
};
module.exports = { createUser, getAllUsers };
