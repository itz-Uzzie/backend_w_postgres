const jwt = require("jsonwebtoken");
const pool = require("../db");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not Provided" });

  const jwtToken = token.replace("Bearer ", "").trim();
  try {
    const verifiedtoken = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const userdata = await pool.query(`select * from users where u_id = $1`, [
      verifiedtoken.u_id,
    ]);

    if (userdata.rows == 0) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    if (userdata.rows[0].isadmin == false) {
      return res
        .status(401)
        .json({ message: "Unauthorized: You have no access for this route" });
    }
    req.user = userdata;
    req.token = jwtToken;
    next();
  } catch (error) {
    console.log(error);
    const status = 400;
    const message = "Unauthorized HTTP, Token not Provided";
    const err = {
      status,
      message,
    };
    next(err);
  }
};

module.exports = authenticate;
