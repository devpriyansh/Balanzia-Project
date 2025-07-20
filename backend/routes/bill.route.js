let express = require("express");
let router = express.Router();

let {
  addBill,
  getBill,
  getUniqueBill,
} = require("../controllers/bill.controller");

router.post("/addbill", addBill);
router.get("/getbill", getBill);
router.get("/getuniquebill/:customerId", getUniqueBill);

module.exports = router;
