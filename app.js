const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const multer = require("multer");

// setup image middleware
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "/puplic/images");
  },
  filename(req, file, callback) {
    callback(null, file.fieldname);
  },
});

const upload = multer({ storage });

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const itemsRouter = require("./routes/items");

// custom middleware
const checkPassword = require("./middleware/checkPassword");

// setup mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

const app = express();

async function connenctDB() {
  await mongoose.connect(mongoDB);
}
connenctDB().catch(console.log);

// view engine setup
app.use(expressLayouts);
app.set("layout", "./layout.ejs");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post("/categories*", checkPassword);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.title = "Error motherfucker";

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
