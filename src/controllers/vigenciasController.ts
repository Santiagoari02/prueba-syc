import { Request, Response } from "express";
import {
    getVigenciasByVehicleIdService,
    payVigenciaByVehicleIdService,
} from "../services/vigenciasService";

export const getVigenciasByVehicleID = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const vigencias = await getVigenciasByVehicleIdService(vehicleId);

        if (vigencias.length === 0) {
            return res.status(404).json({ message: `No se encontraron vigencias para el vehículo con id: ${vehicleId}` });
        }

        res.json(vigencias);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las vigencias" });
    }
};

export const payVigenciaByVehicleID = async (req: Request, res: Response) => {
    try {
        const { vehicleId, vigenciaId } = req.params;
        const payment = await payVigenciaByVehicleIdService(vehicleId, vigenciaId);

        res.status(201).json({
            message: "Pago realizado y vigencia eliminada",
            payment,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};