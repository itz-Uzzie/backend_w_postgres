const express = require("express");
const router = express.Router();
const adminServices = require("../services/adminServices");
const authenticate = require("../middlewares/authMiddleware");

router.route("/").get(authenticate, adminServices.allusersdata);
router.route("/ordersByUsers").get(adminServices.ordersByUsers);

module.exports = router;
