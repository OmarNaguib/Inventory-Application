const express = require("express");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");

const router = express.Router();

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const itemsByCategory = await Item.aggregate([
      {
        $group: { _id: "$category", items: { $push: "$$ROOT" } },
      },
    ]).exec();
    const itemsByCategoryName = await Category.populate(itemsByCategory, {
      path: "items.category",
    });

    res.render("index", {
      title: "Inventory Application",
      itemsByCategoryName,
    });
  })
);

module.exports = router;
