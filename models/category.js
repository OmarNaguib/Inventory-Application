const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

CategorySchema.virtual("url").get(function () {
  return `/categories/${this._id}`;
});

module.exports = model("Author", CategorySchema);
