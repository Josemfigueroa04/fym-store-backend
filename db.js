const Pool = require('pg').Pool;
require('dotenv').config();


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fym-store',
    password: '22921748',
    port: 5432
});

module.exports = pool;