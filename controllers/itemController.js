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
exports.createItemPost = asyncHandler(async (req, res, next) => {
  res.send("NOT YET");
});

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
