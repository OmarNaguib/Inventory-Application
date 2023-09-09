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
  res.render("createCategory", {
    title: "Create Category",
    errors: undefined,
    category: undefined,
  });
});

const proccesCategoryName = body("name", "Category must have name")
  .trim()
  .isLength({ min: 3 })
  .escape();
const proccesCategoryDescription = body("description").escape();

const createCategory = asyncHandler(async (req, res, next) => {
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
  const categoryExists = await Category.findOne({ name: req.body.name }).exec();
  if (categoryExists) {
    res.redirect(categoryExists.url);
  } else {
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
