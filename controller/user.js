const User = require("../Model/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(200).json({ message: "Хэрэглэгчдийн мэдээлэл хоосон байна." });
    }
    res.status(201).json({ message: "Hereglegchiin medeelel oldloo", users });
  } catch (error) {
    // res.status(400).json({
    //   message: "Hereglegchiin medeelliig avhad aldaa garlaa",
    //   err: err.message,
    // });
    next(error);
  }
};

const createUser = async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Ner,email,esvel nuuts ug baihgui baina" });
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({ message: "Successfully registered", user });
  } catch (err) {
    // res
    //   .status(400)
    //   .json({ message: "Burtgel amjiltgui bolloo", error: error.message });
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} hooson baina`,
      error: error.message,
    });
  }

  try {
    const user = await User.findById(`${id}`);
    if (!user) {
      res.status(400).json({ message: `${id} tai hereglegch olodohgui baina` });
    }
    res
      .status(201)
      .json({ message: `${id} id tai hereglegchiin medeelel`, user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id tai hereglegch oldsongui`,
      error: error.message,
    });
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(400).json({ message: `${id} tei hereglegch oldsongui` });
    }
    res.status(201).json({
      message: `${id} id tai hereglegchiin medeelel amjilttai shinchlegdlee`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id tai hereglegch oldsongui`,
      error: error.message,
    });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    res.status(201).json({
      message: `${id} id tai hereglegchiin medeelel amjilttai USTLAA`,
      user,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });
    if (!user.length) {
      res.status(400).json({
        message: `${email}-iin  email esvel password buruu baina`,
      });
    }
    res.status(200).json({
      message: `Amjilttai nevterlee`,
      user,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
};
