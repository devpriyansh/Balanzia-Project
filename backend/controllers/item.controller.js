let SupplierRecord = require("../models/supplierRecord.model");

let getItems = async (req, res) => {
  try {
    let items = await SupplierRecord.find({}, "items"); //fetch only items
    // console.log(items);
    // Flatten the nested items arrays

    let allItems = items.flatMap((item) => item.items);
    res.status(200).json(allItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

module.exports = { getItems };
