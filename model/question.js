const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide question title"],
    },
    body: {
      type: String,
      required: [true, "Please provide question title"],
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
