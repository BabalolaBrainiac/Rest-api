const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  name: String,
  price: Number,
  productImage: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
