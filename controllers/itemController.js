const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");

exports.viewAllItems = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({})
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
  res.send("NOT YET");
});

exports.createItemGet = asyncHandler(async (req, res, next) => {
  res.render("items/itemForm", {
    title: "Create Item",
    errors: undefined,
    item: undefined,
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
  res.send("NOT YET");
});
exports.deleteItemPost = asyncHandler(async (req, res, next) => {
  res.send("NOT YET");
});

exports.updateItemGet = asyncHandler(async (req, res, next) => {
  res.send("NOT YET");
});
exports.updateItemPost = asyncHandler(async (req, res, next) => {
  res.send("NOT YET");
});
