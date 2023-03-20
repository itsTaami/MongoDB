const Category = require("../Model/Category");

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    res
      .status(201)
      .json({ message: "Hereglegchiin medeelel oldloo", category });
  } catch (err) {
    res.status(400).json({
      message: "Hereglegchiin medeelliig avhad aldaa garlaa",
      err: err.message,
    });
  }
};

const createCategory = async (req, res) => {
  console.log(req.body);
  const { title, description, categoryImg, categoryRating } = req.body;

  if (!title || !description || !categoryImg || !categoryRating) {
    res.status(400).json({ message: "Ali neg medeelel buruu baina" });
  }
  try {
    const category = await Category.create({
      title,
      description,
      categoryImg,
      categoryRating,
    });
    res.status(201).json({ message: "Successfully registered", category });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Burtgel amjiltgui bolloo", error: error.message });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} id tai hereglegch oldsongui`,
      error: error.message,
    });
  }

  try {
    const category = await Category.findById(id);
    res
      .status(201)
      .json({ message: `${id} id tai category medeelel`, category });
  } catch (error) {
    res.status(400).json({ message: "Aldaa garlaa", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id tai category oldsongui`,
      error: error.message,
    });
  }

  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: `${id} id tai category medeelel amjilttai shinchlegdlee`,
      category,
    });
  } catch (error) {
    res.status(400).json({ message: "Aldaa garlaa", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id tai category oldsongui`,
      error: error.message,
    });
  }

  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(201).json({
      message: `${id} id tai category medeelel amjilttai USTLAA`,
      category,
    });
  } catch (error) {
    res.status(400).json({ message: "Aldaa garlaa", error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
