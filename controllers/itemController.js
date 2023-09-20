const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const Item = require("../models/item");
const Category = require("../models/category");

const checkPassword = require("../middleware/checkPassword");

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/images`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

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

const proccesItemDescription = body("description").escape();
const proccesItemCategory = body("description").escape();
const proccesItemPrice = body("price", "Price must be a number")
  .isNumeric()
  .escape();
const proccesItemNumber = body("number", "Price must be a number")
  .isNumeric()
  .escape();

const createItem = asyncHandler(async (req, res, next) => {
  const item = await Item({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    number: req.body.number,
    image: req.file ? req.file.filename : "",
  }).populate("category");
  console.log(req.body.password === process.env.PASSWORD);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const categories = await Category.find().exec();
    return res.render("items/itemForm", {
      title: "Create Item",
      item,
      categories,
      errors: errors.array(),
    });
  }
  const itemExists = await Item.findOne({ name: req.body.name }).exec();
  if (itemExists) {
    return res.redirect(itemExists.url);
  }
  await item.save();
  return res.redirect(item.url);
});

exports.createItemPost = [
  upload.single("itemImage"),
  checkPassword,
  proccesItemName,
  proccesItemCategory,
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
exports.deleteItemPost = [
  checkPassword,
  asyncHandler(async (req, res, next) => {
    await Item.findByIdAndRemove(req.body.id);
    res.redirect("/items");
  }),
];

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
  const itemPopulated = item.populate("category");
  const errors = validationResult(req);
  console.log(req.params.id);

  if (!errors.isEmpty()) {
    const categories = await Category.find().exec();
    res.render("items/itemForm", {
      title: "Create Item",
      item: itemPopulated,
      categories,
      errors: errors.array(),
    });
  }

  const result = await Item.findByIdAndUpdate(req.params.id, item, {}).exec();
  console.log({ result });

  res.redirect(`/items/${req.params.id}`);
});

exports.updateItemPost = [
  upload.single("itemImage"),
  checkPassword,
  proccesItemName,
  proccesItemCategory,
  proccesItemDescription,
  proccesItemPrice,
  proccesItemNumber,
  updateItem,
];
