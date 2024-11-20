const { Client } = require("pg");

const pool = new Client(process.env.DATABASE_URL);
module.exports = pool;
