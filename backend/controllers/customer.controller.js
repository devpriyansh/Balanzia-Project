const { find } = require("../models/bill.model");
let Customer = require("../models/customer.model");
let CustomerPayment = require("../models/customerPayment.model");
let mongoose = require("mongoose");
let Bills = require("../models/bill.model");

let getCustomer = async (req, res) => {
  try {
    let customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err || "Failed to fetch Customer" });
  }
};

let getCustomerPayment = async (req, res) => {
  let { customerId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Customer id is invalid" });
    }

    let customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer Not Found" });
    }

    let customerPayment = await CustomerPayment.find({
      customer: new mongoose.Types.ObjectId(customerId),
    }).populate("customerPayment");

    res.status(200).json(customerPayment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err || "Error while fetching Payments" });
  }
};

let addCustomerPayment = async (req, res) => {
  let { customerId, amountPaid } = req.body;

  try {
    let customerPayment = await CustomerPayment.create({
      customer: customerId,
      amountPaid,
    });

    // console.log(customerPayment);

    res.status(201).json({ message: "Payment added successfully" });

    // let customerPayment = await CustomerPayment.find({
    //   customer: new mongoose.Types.ObjectId(customerId),
    // }).populate("customerPayment");
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err || "Error while adding payment" });
  }
};

let getCustomerAmounts = async (req, res) => {
  let { customerId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid Customer Id" });
    }

    let existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer Not Found" });
    }

    let customerAmounts = async () => {
      let customer = await Customer.findById(customerId);

      let bills = await Bills.find({
        customerName: new mongoose.Types.ObjectId(customerId),
      });
      let payment = await CustomerPayment.find({
        customer: new mongoose.Types.ObjectId(customerId),
      });

      let totalBillAmount = bills.reduce((sum, bill) => {
        return sum + parseFloat(bill.finalAmount);
      }, 0);

      let paidAmount = payment.reduce((sum, payment) => {
        return sum + parseFloat(payment.amountPaid);
      }, 0);

      let dueAmount = totalBillAmount - paidAmount;

      return {
        customerName: existingCustomer.customerName,
        totalBillAmount,
        paidAmount,
        dueAmount,
        paymentHistory: payment,
      };
    };

    let amounts = await customerAmounts();
    console.log(amounts);

    res.status(200).json(amounts);
  } catch (err) {
    console.log(err);
    res.status.json({ error: err || "Error while fetching amounts" });
  }
};

module.exports = {
  getCustomer,
  getCustomerPayment,
  addCustomerPayment,
  getCustomerAmounts,
};
