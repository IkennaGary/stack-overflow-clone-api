const Answer = require("../model/answer");
const customErrors = require("../errors");
const Question = require("../model/question");
const { StatusCodes } = require("http-status-codes");

const answerQuestion = async (req, res) => {
  const { body, questionId: questId } = req.body;

  if (!body || !questId) {
    throw new customErrors.BadRequestError("Please provide all fields");
  }
  const question = await Question.findOne({ _id: questId });

  if (!question) {
    throw new customErrors.NotFoundError(`No question with id ${questId}`);
  }
  const answer = await Answer.create(req.body);

  res.status(StatusCodes.CREATED).json({ question, answer });
};

module.exports = answerQuestion;
