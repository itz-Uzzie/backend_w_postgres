const express = require("express");
const router = express.Router();
const orderservices = require("../services/orderServices");

router.route("/showall").get(orderservices.showall);
router.route("/add").post(orderservices.newOrder);

module.exports = router;
