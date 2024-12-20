const express = require("express");
require('express-async-errors');
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require('./controllers/login');

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((err) => {
    logger.error("error connecting to MongoDB:", err.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor)

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
