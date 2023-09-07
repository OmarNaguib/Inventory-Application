const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

exports.viewAllCategories = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view1");
});

exports.viewCategory = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view2");
});

exports.createCategoryGet = asyncHandler(async (req, res, next) => {
  console.log("here");
  res.render("createCategory");
});
exports.createCategoryPost = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view3");
});

exports.deleteCategoryGet = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view4");
});
exports.deleteCategoryPost = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view5");
});

exports.updateCategoryGet = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view6");
});
exports.updateCategoryPost = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view7");
});
