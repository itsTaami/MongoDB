const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(200).json({ message: "Хэрэглэгчдийн мэдээлэл хоосон байна." });
    }
    res.status(201).json({ message: "Hereglegchdiin medeelel oldloo", users });
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

  try {
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ message: "Нэр, имэйл эсвэл нууц үг байхгүй байна." });
    }
    const user = User.create({
      name,
      email,
      password,
    });
    console.log(user);
    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", user });
  } catch (error) {
    next(error);
  }

  // if (!name || !email || !password) {
  //   res.status(400).json({ message: "Ner,email,esvel nuuts ug baihgui baina" });
  // }
  // try {
  //   const hashedPassword = bcrypt.hashSync(password, 10);
  //   const user = await User.create({
  //     name,
  //     email,
  //     phone,
  //     password: hashedPassword,
  //   });
  //   console.log("user:", user);
  //   if (!user.length) {
  //     res.status(400).json({ message: `Email or password is incorrect` });
  //   }
  //   res.status(201).json({ message: "Successfully registered", user });
  // } catch (err) {
  //   // res
  //   //   .status(400)
  //   //   .json({ message: "Burtgel amjiltgui bolloo", error: error.message });
  //   next(err);
  // }
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
  console.log(req.body);
  // const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    console.log("user", user);
    if (!user) {
      res.status(400).json({
        message: `User null`,
      });
    }
    const checkPass = bcrypt.compareSync(req.body.password, user.password);
    console.log(checkPass);
    if (!checkPass) {
      res.status(400).json({ message: `Email esvel Password buruu baina` });
    }
    const { password, _id, name, email, role } = user;
    const token = jwt.sign(
      { _id, name, email, role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 36000,
      }
    );
    res.status(200).json({
      message: `Amjilttai nevterlee`,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  console.log(req.body);
  const { name, email, password, phone } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Successfully registered", user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
};
