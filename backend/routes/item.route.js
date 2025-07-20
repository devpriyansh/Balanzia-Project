const express = require("express");

const router = express.Router();

let { getItems } = require("../controllers/item.controller");

// router.post("/additem", addItem);
router.get("/getitems", getItems);

module.exports = router;
