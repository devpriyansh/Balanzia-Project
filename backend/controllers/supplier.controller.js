let Supplier = require("../models/supplier.model");
let SupplyRecord = require("../models/supplierRecord.model");
let SupplierPayment = require("../models/supplierPayment.model");
const { default: mongoose } = require("mongoose");

let addSupplier = async (req, res) => {
  let { supplierName, billNumber, items, totalAmount } = req.body;

  //   let { name, brand, color, price, category, quantity, description } = items;
  // console.log(supplierName);

  try {
    let supplier = await Supplier.findOne({ supplierName });

    if (!supplier) {
      supplier = await Supplier.create({ supplierName });
    }

    let supplyRecord = await SupplyRecord.create({
      supplier: supplier._id,
      billNumber,
      items,
      totalAmount,
    });

    res
      .status(201)
      .json({ message: "Supplier Items Added successfully", supplyRecord });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err || "Failed to supply Records" });
  }
};

let addSupplierPayment = async (req, res) => {
  let { supplierId, amountPaid } = req.body;
  console.log(supplierId, amountPaid);

  try {
    let supplierPayment = await SupplierPayment.create({
      supplier: supplierId,
      amountPaid,
    });

    res.status(201).json({ message: "Payment Create Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err || "Error while adding payment" });
  }
};

let getSupplierPayment = async (req, res) => {
  let { supplierId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
      return res.status(400).json({ message: "Invalid Supplier Id" });
    }

    let existingSupplier = await Supplier.findById(supplierId);

    if (!existingSupplier) {
      return res.status(404).json({ message: "Supplier Not Found" });
    }

    let supplierRecords = await SupplyRecord.find({
      supplier: new mongoose.Types.ObjectId(supplierId),
    });

    let payment = await SupplierPayment.find({
      supplier: new mongoose.Types.ObjectId(supplierId),
    });

    let totalAmount = supplierRecords.reduce((sum, record) => {
      return sum + parseFloat(record.totalAmount);
    }, 0);

    let paidAmount = payment.reduce((sum, payment) => {
      return sum + parseFloat(payment.amountPaid);
    }, 0);

    let dueAmount = totalAmount - paidAmount;

    res.status(200).json({
      supplierName: existingSupplier.supplierName,
      totalAmount,
      paidAmount,
      dueAmount,
      paymentHistory: payment,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: err || "Error while fetching supplierPayment " });
  }
};

let getSupplier = async (req, res) => {
  try {
    let items = await Supplier.find();
    // console.log(items);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err || "Failed to fetch Suppliers" });
  }
};

module.exports = {
  addSupplier,
  addSupplierPayment,
  getSupplier,
  getSupplierPayment,
};
