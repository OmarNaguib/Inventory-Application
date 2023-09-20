const { Schema, model } = require("mongoose");

const ItemSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Categories", required: true },
  price: { type: Number, required: true },
  number: { type: Number, required: true },
  image: { type: String },
});

ItemSchema.virtual("url").get(function () {
  return `/items/${this._id}`;
});

module.exports = model("Items", ItemSchema);
