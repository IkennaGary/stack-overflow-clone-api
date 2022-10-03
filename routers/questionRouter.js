const express = require("express");
const {
  getAllQuestions,
  createQuestion,
  getSingleQuestion,
} = require("../controllers/questionController");

const router = express.Router();

router.route("/").post(createQuestion).get(getAllQuestions);

router.route("/:id").get(getSingleQuestion);

module.exports = router;
