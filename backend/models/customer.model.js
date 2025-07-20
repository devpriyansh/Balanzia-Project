let mongoose = require("mongoose");

let customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
  },
  contactInfo: {
    type: String,
    phone: String,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
