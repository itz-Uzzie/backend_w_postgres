const pool = require("../db");
const jwt = require("jsonwebtoken");

const showall = async (req, res) => {
  try {
    const users = await pool.query(`select * from users order by u_id asc`);
    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

const adduser = async (req, res) => {
  try { 
    const { name } = req.body;
    const useradded = await pool.query(
      `insert into users (name) values ($1)`,
      [name],
      (err, result) => {
        if (err) return res.status(400).json({ error: err });
        else
          res
            .status(201)
            .json(
              result.rowCount == 1
                ? "User created successfully"
                : "something went wrong"
            );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json("error while adding user");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await pool.query(`select * from users where email = $1`, [
      email,
    ]);
    if (userExist.rowCount == 0) return res.status(404).json("User not found");
    if (userExist.rows[0].password !== password)
      return res.status(400).json("Incorrect password");
    const token = jwt.sign(
      { u_id: userExist.rows[0].u_id },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );
    res.status(200).json({ user: userExist.rows[0], token: token });
  } catch (error) {
    res.status(500).json("internal server error while loggin");
    console.log(error);
  }
};

const updPassword = async (req, res) => {
  try {
    const { newpassword } = req.body;
    const id = req.params.id;
    await pool.query(
      `update users set password = $1 where u_id = $2`,
      [newpassword, id],
      (err, result) => {
        if (err) return res.status(400).json(err);
      }
    );
    res.status(200).json("Password updated successfuly");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error in updPassword");
  }
};

const deluser = async (req, res) => {
  try {
    await pool.query(
      `delete from users where email = $1`,
      [req.params.email],
      (err, result) => {
        if (err)
          return res
            .status(400)
            .json("Something went wrong while removing user");
        else return res.status(200).json("User removed successfully");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error while removing user");
  }
};

module.exports = { showall, adduser, login, updPassword, deluser };
