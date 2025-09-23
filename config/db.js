require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(client => {
        console.log('Conectado a La BD');
        client.release();
    })
    .catch(err => console.error('Error al conectar a la BD'));

module.exports = pool;
