const { default: mongoose } = require("mongoose");
let Bill = require("../models/bill.model");
let Customer = require("../models/customer.model");

let addBill = async (req, res) => {
  let { customerName, finalAmount, items } = req.body;
  // console.log({ customerName, finalAmount, items });

  try {
    let customer = await Customer.findOne({ customerName });

    if (!customer) {
      customer = await Customer.create({ customerName });
    }
    let bill = await Bill.create({
      customerName: customer._id,
      finalAmount,
      items,
    });

    res.status(201).json({ message: "Bill Added successfully" });
  } catch (err) {
    res.status(500).json({ error: err || "Error while adding bill" });
  }
};

let getBill = async (req, res) => {
  try {
    let bills = await Bill.find();
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ error: err || "Error fetching bills" });
  }
};

let getUniqueBill = async (req, res) => {
  let { customerId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid customer id" });
    }

    let customer = await Bill.findById(customerId);

    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    let customerBill = await Bill.find({
      _id: new mongoose.Types.ObjectId(customerId),
    }).populate("customerName");

    res.status(200).json(customerBill);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { addBill, getBill, getUniqueBill };
