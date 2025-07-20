let express = require("express");
let router = express.Router();

let {
  addSupplier,
  getSupplier,
  addSupplierPayment,
  getSupplierPayment,
} = require("../controllers/supplier.controller");

router.post("/addsupplier", addSupplier);
router.post("/addsupplierpayment", addSupplierPayment);
router.get("/getsuppliers", getSupplier);
router.get("/getsupplierpayment/:supplierId", getSupplierPayment);

module.exports = router;
