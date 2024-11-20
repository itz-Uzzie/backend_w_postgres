const express = require("express");
const router = express.Router();
const productservices = require("../services/productServices");

router.route("/all").get(productservices.showall);
router.route("/new").post(productservices.addProduct);

module.exports = router;