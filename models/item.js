const { Schema, model } = require("mongoose");

const ItemSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, ref: "Categories", required: true },
  price: { type: Number, required: true },
  number: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
  return `/items/${this._id}`;
});

module.exports = model("Author", ItemSchema);
