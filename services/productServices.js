const pool = require("../db");

const showall = async (req, res) => {
  try {
    const products = await pool.query(`select * from products`);
    res.status(200).json(products.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    await pool.query(
      `insert into products (name, price) values($1, $2)`,
      [name, price],
      (err, result) => {
        if (err) return res.status(400).json(err);
        return res
        .status(201)
        .json(
          result.rowCount == 1
            ? "product added successfully"
            : "something went wrong"
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong while adding product");
  }
};

module.exports = { showall, addProduct };
