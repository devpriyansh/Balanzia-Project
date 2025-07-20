let mongoose = require("mongoose");

let itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let billSchema = new mongoose.Schema({
  customerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  finalAmount: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  items: [itemSchema],
});

module.exports = mongoose.model("Bill", billSchema);
