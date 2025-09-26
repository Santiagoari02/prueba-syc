import pool from "../config/db";

export const getVigenciasByVehicleIdService = async (vehicleId: string) => {
    const query = "SELECT * FROM vigencias WHERE vehicle_id = $1";
    const result = await pool.query(query, [vehicleId]);
    return result.rows;
};

export const payVigenciaByVehicleIdService = async (vehicleId: string, vigenciaId: string) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const vigenciaQuery = `
      SELECT id, year, amount
      FROM vigencias
      WHERE id = $1 AND vehicle_id = $2
    `;
        const vigenciaResult = await client.query(vigenciaQuery, [vigenciaId, vehicleId]);
        if (vigenciaResult.rowCount === 0) throw new Error("Vigencia no encontrada");

        const vigencia = vigenciaResult.rows[0];
        const amount = vigencia.amount;

        const governorAmount = Math.round(amount * 0.95);
        const platformFee = Math.round(amount * 0.05);

        const vehicleQuery = "SELECT * FROM vehicles WHERE id = $1";
        const vehicleResult = await client.query(vehicleQuery, [vehicleId]);
        if (vehicleResult.rowCount === 0) throw new Error("Vehículo no encontrado");

        const vehicle = vehicleResult.rows[0];
        const ownerId = vehicle.owner_id;

        const paymentQuery = `
      INSERT INTO payments (user_id, vehicle_id, vigencia_year, amount_cop, governor_amount_cop, platform_fee_cop)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
        const paymentResult = await client.query(paymentQuery, [
            ownerId,
            vehicleId,
            vigencia.year,
            amount,
            governorAmount,
            platformFee,
        ]);

        await client.query("DELETE FROM vigencias WHERE id = $1", [vigenciaId]);

        await client.query("COMMIT");
        return paymentResult.rows[0];
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};
