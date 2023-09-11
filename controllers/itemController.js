const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");
const Category = require("../models/category");

exports.viewAllItems = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({})
    .populate("category")
    .sort({
      title: 1,
    })
    .exec();
  res.render("items/items", {
    title: "All items",
    items: allItems,
  });
});

exports.viewItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category");
  if (!item) {
    const error = new Error("Item not found");
    error.status = 404;
    next(error);
  }
  res.render("items/item", { title: "Item details", item });
});

exports.createItemGet = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();
  res.render("items/itemForm", {
    title: "Create Item",
    errors: undefined,
    item: undefined,
    categories,
  });
});

const proccesItemName = body(
  "name",
  "Item must have name (at least 3 characters)"
)
  .trim()
  .isLength({ min: 3 })
  .escape();
// TODO: procces category info
const proccesItemDescription = body("description").escape();
const proccesItemCategory = body("description").escape();
const proccesItemPrice = body("price", "Price must be a number")
  .isNumeric()
  .escape();
const proccesItemNumber = body("number", "Price must be a number")
  .isNumeric()
  .escape();

const createItem = asyncHandler(async (req, res, next) => {
  console.log("here");
  const item = Item({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    number: req.body.number,
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("items/itemForm", {
      title: "Create Item",
      item,
      errors: errors.array(),
    });
  }
  const itemExists = await Item.findOne({ name: req.body.name }).exec();
  if (itemExists) {
    res.redirect(itemExists.url);
  } else {
    console.log("here");
    await item.save();
    res.redirect(item.url);
  }
});

exports.createItemPost = [
  proccesItemName,
  proccesItemDescription,
  proccesItemPrice,
  proccesItemNumber,
  createItem,
];

exports.deleteItemGet = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  if (!item) res.redirect("/items");
  res.render("items/deleteItem", {
    title: `delete ${item.name} item`,
    item,
  });
});
exports.deleteItemPost = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndRemove(req.body.id);
  res.redirect("/items");
});

exports.updateItemGet = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  const categories = await Category.find().exec();
  if (!item) {
    const error = new Error("Item not found");
    error.status = 404;
    next(error);
  }
  res.render("items/itemForm", {
    title: "Update item",
    item,
    errors: undefined,
    categories,
  });
});

const updateItem = asyncHandler(async (req, res, next) => {
  const item = Item({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    number: req.body.number,
    _id: req.params.id,
  });
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const categories = await Category.find().exec();
    res.render("items/itemForm", {
      title: "Create Item",
      item,
      categories,
      errors: errors.array(),
    });
  }

  await Item.findByIdAndUpdate(req.params.id, item, {});
  res.redirect(item.url);
});

exports.updateItemPost = [
  proccesItemName,
  proccesItemDescription,
  proccesItemPrice,
  proccesItemNumber,
  updateItem,
];
