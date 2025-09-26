import dotenv from "dotenv";
import { Pool, PoolClient } from "pg";

dotenv.config();

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'prueba_syc',
    password: '0226',
    port: 5432,
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