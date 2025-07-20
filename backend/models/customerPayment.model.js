let mongoose = require("mongoose");

let customerPaymentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
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

module.exports = mongoose.model("CustomerPayment", customerPaymentSchema);
