const pool = require("../db");

const showall = async (req, res) => {
  try {
    const orders = await pool.query(`select * from orders`);
    res.status(200).json(orders.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

const newOrder = async (req, res) => {
  try {
    const { u_id, o_date, p_id, quantity } = req.body;

    const data = await pool.query(
      `insert into orders (u_id, o_date) values ($1, $2)`,
      [u_id, o_date],
      (err, result) => {
        if (err)
          return res.status(400).json({
            msg: "Something went wrong in newOrder function",
            error: err,
          });
      }
    );

    const order_id = await pool.query(
      `select o_id from orders where u_id = $1 and o_date = $2`,
      [u_id, o_date]
    );
    const o_id = order_id.rows[0].o_id;
    await pool.query(
      `insert into order_items (o_id, p_id, quantity) values ($1, $2, $3)`,
      [o_id, p_id, quantity],
      (err, result) => {
        if (err) return res.status(400).json(err.message);
        res
          .status(201)
          .json(
            result.rowCount == 1 ? "order created successfuly" : "Order denied"
          );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json("Error in newOrder function");
  }
};

module.exports = { showall, newOrder };
