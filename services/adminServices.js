const pool = require("../db");

const allusersdata = async (req, res) => {
  try {
    const data = await pool.query(
      `select o.o_date, u.name, p.name product, p.price, oi.quantity, (p.price*oi.quantity) total_price from users u join orders o on o.u_id = u.u_id join order_items oi on oi.o_id = o.o_id join products p on oi.p_id = p.p_id order by o.o_date desc`
    );
    if (data.rowCount == 0) return res.status(404).json("no any data found");
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error in alluserdata");
  }
};

const ordersByUsers = async (req, res) => {
  try {
    const data = await pool.query(
      `select u.name, count(o.o_id) no_of_orders from users u left join orders o on u.u_id = o.u_id group by o.u_id, u.u_id`
    );
    if (data.rowCount == 0) return res.status(404).json("No any data found");
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error in orderByUsers");
  }
};

module.exports = { allusersdata, ordersByUsers };
