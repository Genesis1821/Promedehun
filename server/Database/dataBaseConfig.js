const { Pool } = require('pg');


const pool = new Pool({
    database: 'promedehun',
    host: 'localhost',
    user: 'postgres',
    password: 'data',
    port: '5432'
});


module.exports = pool;