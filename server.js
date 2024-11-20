require("dotenv").config();
const userControllers = require("./controllers/userControllers");
const productControllers = require("./controllers/productControllers");
const orderControllers = require("./controllers/orderControllers");
const adminController = require("./controllers/adminController");
const express = require("express");
const pool = require("./db");
const app = express();

app.use(express.json());

app.use("/api/v1/user", userControllers);
app.use("/api/v1/product", productControllers);
app.use("/api/v1/order", orderControllers);
app.use("/api/admin", adminController);

pool.connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
  });
});
