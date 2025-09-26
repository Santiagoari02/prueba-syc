"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vigenciasController_1 = require("../controllers/vigenciasController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
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
router.get("/:vehicleId/vigencias", authMiddleware_1.authenticate, vigenciasController_1.getVigenciasByVehicleID);
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
router.post("/:vehicleId/vigencias/:vigenciaId/pay", authMiddleware_1.authenticate, vigenciasController_1.payVigenciaByVehicleID);
exports.default = router;
