// const mongoose = require("mongoose");

// const itemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   brand: { type: String, required: true },
//   color: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   description: { type: String },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const supplierSchema = new mongoose.Schema({
//   supplierName: {
//     type: String,
//     required: true,
//   },
//   billNumber: {
//     type: String,
//     required: true,
//   },
//   items: [itemSchema], // array of items
//   totalAmount: {
//     type: String,
//     required: true,
//   },
//   paidAmount: {
//     type: String,
//     required: true,
//   },
//   dueAmount: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("Supplier", supplierSchema);

//---------------------------------------------------------------------------

const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate supplier entries
  },
  contactInfo: {
    phone: String,
    email: String,
    address: String,
  },
});

module.exports = mongoose.model("Supplier", supplierSchema);
