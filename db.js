const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "lyra-live",
  host: "localhost",
  port: 5432,
  database: "trader"
});

module.exports = pool;
