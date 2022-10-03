const { StatusCodes } = require("http-status-codes");
const customErrors = require("../errors");
const Answer = require("../model/answer");
const Question = require("../model/question");

const getAllQuestions = async (req, res) => {
  const pages = req.query.pages || 0;
  const limit = req.query.limit || 15;
  const skip = pages * limit;
  const question = await Question.find({})
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json({ question, count: question.length });
};

const createQuestion = async (req, res) => {
  const { title, body, tags } = req.body;

  if (!title || !body || !tags) {
    throw new customErrors.BadRequestError("Please provide all fields");
  }
  const question = await Question.create(req.body);

  res.status(StatusCodes.CREATED).json({ question });
};

const getSingleQuestion = async (req, res) => {
  const { id: qustId } = req.params;
  const question = await Question.findOne({ _id: qustId });

  if (!question) {
    throw new customErrors.NotFoundError(
      `No question found with gthe id ${qustId}`
    );
  }

  const answer = await Answer.find({ questionId: qustId });

  res.status(StatusCodes.OK).json({ question, answer });
};

module.exports = {
  getAllQuestions,
  createQuestion,
  getSingleQuestion,
};
