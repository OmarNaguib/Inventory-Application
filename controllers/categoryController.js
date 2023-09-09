const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

exports.viewAllCategories = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view1");
});

exports.viewCategory = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view2");
});

exports.createCategoryGet = asyncHandler(async (req, res, next) => {
  res.render("createCategory", { title: "Create Category" });
});

const proccesCategoryName = body("name", "Category must have name")
  .trim()
  .isLength({ min: 3 })
  .escape();
const proccesCategoryDescription = body("description").escape();

const createCategory = asyncHandler(async (req, res, next) => {
  console.log("here");
  const category = Category({
    name: req.body.name,
    description: req.body.description,
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("createCategory", {
      title: "Create Category",
      category,
      errors: errors.array(),
    });
  }
  console.log("herettt");

  const categoryExists = await Category.findOne({ name: req.body.name }).exec();
  if (categoryExists) {
    console.log(categoryExists, "ddjd");
    res.redirect(categoryExists.url);
  } else {
    console.log("here");
    await category.save();
    res.redirect(category.url);
  }
});

exports.createCategoryPost = [
  proccesCategoryName,
  proccesCategoryDescription,
  createCategory,
];

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
