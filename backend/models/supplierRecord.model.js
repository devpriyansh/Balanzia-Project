let mongoose = require("mongoose");

let itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  // color: { type: String, required: true },
  price: { type: Number, required: true },
  // category: { type: String, required: true },
  quantity: { type: Number, required: true },
  // description: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let supplyRecordSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    require: true,
  },
  billNumber: { type: String, required: true },
  items: [itemSchema],
  totalAmount: { type: String, required: true },
  // paidAmount: { type: String, required: true },
  // dueAmount: { type: String, required: true },
  supplyDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SupplyRecord", supplyRecordSchema);
