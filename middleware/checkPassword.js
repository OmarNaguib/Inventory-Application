const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const checkPassword = body("password", "Incorrect password")
  .equals(process.env.PASSWORD)
  .escape();

module.exports = checkPassword;
