// config/db.js
const { Pool } = require('pg');
const { postgres } = require('./keys');

const pool = new Pool(postgres);

module.exports = pool;
