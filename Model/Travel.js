const mongoose = require("mongoose");

const TravelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: [500, "Tailbar hamgiin ihdee 500 temdegtees ihgui baina"],
  },
  travelImg: {
    type: String,
  },

  travelPrice: {
    type: Number,
  },
  travelLocation: {
    type: String,
  },
  travelDay: {
    type: Date,
  },
});

const Travel = mongoose.model("Travel", TravelSchema);

module.exports = Travel;
