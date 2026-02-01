const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const pastesRouter = require("./routes/pastes");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/pastes", pastesRouter);

module.exports = app;
