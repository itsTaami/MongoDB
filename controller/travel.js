const { Error } = require("mongoose");
const Travel = require("../Model/Travel");

const getAllTravel = async (req, res, next) => {
  try {
    const travels = await Travel.find().populate("category");
    res.status(201).json({ message: "Travel-iin medeelel oldloo", travels });
  } catch (err) {
    next(err);
  }
};

const createTravel = async (req, res, next) => {
  console.log(req.body);
  const {
    title,
    description,
    travelPrice,
    travelImg,
    travelLocation,
    travelDay,
    category,
  } = req.body;

  // if (
  //   !title ||
  //   !description ||
  //   !travelPrice ||
  //   !travelImg ||
  //   !travelLocation ||
  //   !travelDay
  // ) {
  //   res.status(400).json({ message: "Medeelel buruu baina" });
  // }
  try {
    const travel = await Travel.create({
      title,
      description,
      travelPrice,
      travelImg,
      travelLocation,
      travelDay,
    });
    res.status(201).json({ message: "Successfully registered", travel });
  } catch (error) {
    next(error);
    // res
    //   .status(400)
    //   .json({ message: "Burtgel amjiltgui bolloo", error: error.message });
  }
};

const getTravel = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} id tai travel oldsongui`,
      error: error.message,
    });
  }

  try {
    const travel = await Travel.findById(id);
    res
      .status(201)
      .json({ message: `${id} id tai travel iin medeelel`, travel });
  } catch (error) {
    res.status(400).json({ message: "Aldaa garlaa", error: error.message });
  }
};

const updateTravel = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id tai travel oldsongui`,
      error: error.message,
    });
  }

  try {
    const travel = await Travel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({
      message: `${id} id tai travel iin medeelel amjilttai shinchlegdlee`,
      travel,
    });
  } catch (error) {
    res.status(400).json({ message: "Aldaa garlaa", error: error.message });
  }
};

const deleteTravel = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id tai travel oldsongui`,
      error: error.message,
    });
  }

  try {
    const travel = await Travel.findByIdAndDelete(id);
    res.status(201).json({
      message: `${id} id tai hereglegchiin medeelel amjilttai USTLAA`,
      travel,
    });
  } catch (error) {
    res.status(400).json({ message: "Aldaa garlaa", error: error.message });
  }
};
module.exports = {
  createTravel,
  getAllTravel,
  getTravel,
  updateTravel,
  deleteTravel,
};
