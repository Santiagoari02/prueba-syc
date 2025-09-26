import { Pool, PoolClient } from "pg";

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT!), // Convertir a número
});

setTimeout(() => {
    pool.connect()
        .then((client: PoolClient) => {
            console.log("Conectado a la BD exitosamente");
            client.release();
        })
        .catch((err: Error) => {
            console.error("Error al conectar a la BD: ", err.message);
        });
}, 5000);

export default pool;