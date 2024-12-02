var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// to add header or any file into layout
// app.engine(".hbs", expressHbs({ defaultLayout: false, extname: ".hbs" }));
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "layout",
    extname: ".hbs",
    layoutsDir: "views/layouts/",
    partialsDir: "views/partials/",
  })
);

// view engine setup
// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// connect to DB
mongoose
  .connect("mongodb://localhost:27017/Shopping_cart")
  .then(() => {
    console.log("Connecting DB Successfully");
  })
  .catch((error) => {
    console.log(`Failed connect => ${error}`);
  });

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
