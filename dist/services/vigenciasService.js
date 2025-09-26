"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payVigenciaByVehicleIdService = exports.getVigenciasByVehicleIdService = void 0;
const db_1 = __importDefault(require("../config/db"));
const getVigenciasByVehicleIdService = async (vehicleId) => {
    const query = "SELECT * FROM vigencias WHERE vehicle_id = $1";
    const result = await db_1.default.query(query, [vehicleId]);
    return result.rows;
};
exports.getVigenciasByVehicleIdService = getVigenciasByVehicleIdService;
const payVigenciaByVehicleIdService = async (vehicleId, vigenciaId) => {
    const client = await db_1.default.connect();
    try {
        await client.query("BEGIN");
        const vigenciaQuery = `
      SELECT id, year, amount
      FROM vigencias
      WHERE id = $1 AND vehicle_id = $2
    `;
        const vigenciaResult = await client.query(vigenciaQuery, [vigenciaId, vehicleId]);
        if (vigenciaResult.rowCount === 0)
            throw new Error("Vigencia no encontrada");
        const vigencia = vigenciaResult.rows[0];
        const amount = vigencia.amount;
        const governorAmount = Math.round(amount * 0.95);
        const platformFee = Math.round(amount * 0.05);
        const vehicleQuery = "SELECT * FROM vehicles WHERE id = $1";
        const vehicleResult = await client.query(vehicleQuery, [vehicleId]);
        if (vehicleResult.rowCount === 0)
            throw new Error("Vehículo no encontrado");
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
    }
    catch (error) {
        await client.query("ROLLBACK");
        throw error;
    }
    finally {
        client.release();
    }
};
exports.payVigenciaByVehicleIdService = payVigenciaByVehicleIdService;
