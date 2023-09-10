const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

exports.viewAllCategories = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name description")
    .sort({
      title: 1,
    })
    .exec();
  res.render("categories/categories", {
    title: "All Categories",
    categories: allCategories,
  });
});

exports.viewCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id, "name description");
  if (!category) {
    const error = new Error("Category not found");
    error.status = 404;
    next(error);
  }
  res.render("categories/category", { title: "Category details", category });
});

exports.createCategoryGet = asyncHandler(async (req, res, next) => {
  res.render("categories/createCategory", {
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
    res.render("categories/createCategory", {
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
  const category = await Category.findById(req.params.id).exec();
  console.log(category);
  if (!category) res.redirect("/categories");
  res.render("categories/deleteCategory", {
    title: `delete ${category.name} category`,
    category,
  });
});
exports.deleteCategoryPost = asyncHandler(async (req, res, next) => {
  await Category.findByIdAndRemove(req.body.id);
  res.redirect("/categories");
});

exports.updateCategoryGet = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view6");
});
exports.updateCategoryPost = asyncHandler(async (req, res, next) => {
  res.send("NOT YET,view7");
});
