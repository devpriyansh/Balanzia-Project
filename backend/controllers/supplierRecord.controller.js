const mongoose = require("mongoose");
const Supplier = require("../models/supplier.model");
const SupplyRecord = require("../models/supplierRecord.model");
const { ObjectId } = require("mongodb");

const getSupplierRecord = async (req, res) => {
  const { supplierId } = req.params;
  // console.log("Supplier ID:", supplierId);

  try {
    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
      return res.status(400).json({ message: "Invalid supplier ID" });
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const records = await SupplyRecord.find({
      supplier: new mongoose.Types.ObjectId(supplierId),
    }).populate("supplier");
    // console.log(records);
    // console.log("Records found:", records.length);

    res.status(200).json(records);
  } catch (err) {
    console.error("Error fetching supplier records:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSupplierRecord };
