import { Router } from "express";
import { getVigenciasByVehicleID, payVigenciaByVehicleID } from "../controllers/vigenciasController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @openapi
 * /vehicles/{vehicleId}/vigencias:
 *   get:
 *     summary: Obtener vigencias por vehículo
 *     tags:
 *       - Vigencias
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Lista de vigencias
 *       404:
 *         description: No se encontraron vigencias
 */
router.get("/:vehicleId/vigencias", authenticate, getVigenciasByVehicleID);

/**
 * @openapi
 * /vehicles/{vehicleId}/vigencias/{vigenciaId}/pay:
 *   get:
 *     summary: Pagar una vigencia según vigenciaId
 *     tags:
 *       - Vigencias
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del vehículo
 *       - in: path
 *         name: vigenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la vigencia
 *     responses:
 *       200:
 *         description: Vigencia pagada
 *       404:
 *         description: No se encontró la vigencia a pagar
 */
router.post("/:vehicleId/vigencias/:vigenciaId/pay", authenticate, payVigenciaByVehicleID)

export default router;