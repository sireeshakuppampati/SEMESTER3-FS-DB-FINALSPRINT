// db/postgres.js
const { Pool } = require('pg');
const keys = require('../config/keys');

const pool = new Pool({
  user: keys.postgres.user,
  host: keys.postgres.host,
  database: keys.postgres.database,
  password: keys.postgres.password,
  port: keys.postgres.port,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
