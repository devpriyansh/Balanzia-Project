let mongoose = require("mongoose");

let supplierPaymentSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SupplierPayment", supplierPaymentSchema);
