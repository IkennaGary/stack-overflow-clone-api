const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Please provide question answer"],
    },
    questionId: {
      type: mongoose.Types.ObjectId,
      ref: "Question",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
