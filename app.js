//Dotenv
require("dotenv").config();
//Async Errors
require("express-async-errors");
//Express
const express = require("express");
const app = express();

//Custom Middlewares
app.use(express.json());

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send(
    '<h1>Stack Overflow  REST-API</h1><a href="/api-docs">Documentation</a>'
  );
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Routers
const questionRouter = require("./routers/questionRouter");
const answerRouter = require("./routers/answerRouter");

app.use("/api/v1/question", questionRouter);
app.use("/api/v1/answer", answerRouter);

//Error Middlewares
const NotFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

//Connect to DB
const connectDB = require("./db/connect");

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
