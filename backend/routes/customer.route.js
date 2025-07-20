let express = require("express");
let router = express.Router();
let protect = require("../middleware/authMiddleware");

let {
  getCustomer,
  addCustomerPayment,
  getCustomerPayment,
  getCustomerAmounts,
} = require("../controllers/customer.controller");
let { getCustomerBill } = require("../controllers/customerBills.controller");

router.get("/getcustomer", protect, getCustomer);
router.get("/getcustomerbills/:customerId", getCustomerBill);
router.get("/getcustomerpayment/:customerId", getCustomerPayment);
router.post("/addcustomerpayment", addCustomerPayment);
router.get("/getcustomeramount/:customerId", getCustomerAmounts);

module.exports = router;
