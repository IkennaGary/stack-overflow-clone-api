const express = require("express");
const answerQuestion = require("../controllers/answerController");

const router = express.Router();

router.route("/").post(answerQuestion);

module.exports = router;
