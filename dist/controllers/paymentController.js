"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPayments = exports.getPaymentsByUserID = void 0;
const paymentService_1 = require("../services/paymentService");
const getPaymentsByUserID = async (req, res) => {
    try {
        const user = req.user;
        const payments = await (0, paymentService_1.getPaymentsByUserIdService)(user.userId);
        if (payments.length === 0) {
            return res.status(404).json({ message: "No se encontraron pagos para el usuario" });
        }
        res.json(payments);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los pagos del usuario" });
    }
};
exports.getPaymentsByUserID = getPaymentsByUserID;
const getAllPayments = async (req, res) => {
    try {
        const payments = await (0, paymentService_1.getAllPaymentsService)();
        if (payments.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún pago" });
        }
        res.json(payments);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener todos los pagos" });
    }
};
exports.getAllPayments = getAllPayments;
