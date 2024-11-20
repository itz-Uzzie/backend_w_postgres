const express = require("express");
const router = express.Router();
const userservices = require("../services/userServices");

router.route("/new").post(userservices.adduser);
router.route("/all").get(userservices.showall);
router.route("/login").get(userservices.login);
router.route("/updPass/:id").patch(userservices.updPassword);

module.exports = router;
