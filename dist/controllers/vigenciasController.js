"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payVigenciaByVehicleID = exports.getVigenciasByVehicleID = void 0;
const vigenciasService_1 = require("../services/vigenciasService");
const getVigenciasByVehicleID = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vigencias = await (0, vigenciasService_1.getVigenciasByVehicleIdService)(vehicleId);
        if (vigencias.length === 0) {
            return res.status(404).json({ message: `No se encontraron vigencias para el vehículo con id: ${vehicleId}` });
        }
        res.json(vigencias);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener las vigencias" });
    }
};
exports.getVigenciasByVehicleID = getVigenciasByVehicleID;
const payVigenciaByVehicleID = async (req, res) => {
    try {
        const { vehicleId, vigenciaId } = req.params;
        const payment = await (0, vigenciasService_1.payVigenciaByVehicleIdService)(vehicleId, vigenciaId);
        res.status(201).json({
            message: "Pago realizado y vigencia eliminada",
            payment,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.payVigenciaByVehicleID = payVigenciaByVehicleID;
