const { Pool } = require("pg");

const pool = new Pool({
  user: "isadfrn",
  host: "localhost",
  database: "petshop_db",
  password: "294wu46ufGnGiU",
  port: 5432,
});

module.exports = pool;
