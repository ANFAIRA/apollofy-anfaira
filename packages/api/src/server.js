const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const { config } = require("./config");
const { errorMiddleware } = require("./middlewares");
const {
  userRouter,
  trackRouter,
  playlistRouter,
  genreRouter,
} = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
//app.use(json({limit:"30mb", extended:"true"}));
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(
  cors({
    origin: config.client.url,
  }),
);

app.use(userRouter);
app.use(trackRouter);
app.use(playlistRouter);
app.use(genreRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    data: "hello-world",
  });
});

app.use(errorMiddleware);

module.exports = {
  app: app,
};
