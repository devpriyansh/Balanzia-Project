let express = require("express");
let router = express.Router();

let { getSupplierRecord } = require("../controllers/supplierRecord.controller");

router.get("/getsupplierrecords/:supplierId", getSupplierRecord);

module.exports = router;
