const { Schema, model } = require("mongoose");
// Todo: make category required
const ItemSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  number: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
  return `/items/${this._id}`;
});

module.exports = model("Author", ItemSchema);
