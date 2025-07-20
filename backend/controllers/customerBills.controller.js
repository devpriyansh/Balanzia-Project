let Bill = require("../models/bill.model");
let Customer = require("../models/customer.model");
let mongoose = require("mongoose");

let getCustomerBill = async (req, res) => {
  let { customerId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: "Invalid Id" });
    }

    let customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    let customerBills = await Bill.find({
      customerName: new mongoose.Types.ObjectId(customerId),
    }).populate("customerName");

    console.log(customerBills);

    res.status(200).json(customerBills);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err || "Failed to Fetch Bills" });
  }
};

module.exports = { getCustomerBill };
