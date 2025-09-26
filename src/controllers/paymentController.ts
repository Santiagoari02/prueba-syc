import { Request, Response } from "express";
import {
    getPaymentsByUserIdService,
    getAllPaymentsService,
} from "../services/paymentService";

export const getPaymentsByUserID = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const payments = await getPaymentsByUserIdService(user.userId);

        if (payments.length === 0) {
            return res.status(404).json({ message: "No se encontraron pagos para el usuario" });
        }

        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pagos del usuario" });
    }
};

export const getAllPayments = async (req: Request, res: Response) => {
    try {
        const payments = await getAllPaymentsService();

        if (payments.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún pago" });
        }

        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener todos los pagos" });
    }
};