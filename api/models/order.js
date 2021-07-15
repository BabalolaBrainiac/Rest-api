const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  product: { type: mongoose.ObjectId, ref: "Product", required:true },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Order", orderSchema);
