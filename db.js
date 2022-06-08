const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "optimarket",
  host: "localhost",
  port: 5432,
  database: "collection"
});

module.exports = pool;
