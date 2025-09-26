import { Router } from "express";
import { getPaymentsByUserID, getAllPayments } from "../controllers/paymentController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = Router();

/**
 * @openapi
 * /payments/me:
 *   get:
 *     summary: Consultar todas los pagos de vigencia realizados por el usuario que está logueado
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Lista de pagos realizados por el usuario
 *       404:
 *         description: No se encontraron pagos a vigencias realizados por el usuario.
 */
router.get("/me", authenticate, getPaymentsByUserID);

/**
 * @openapi
 * /admin/payments:
 *   get:
 *     summary: Consultar todos los pagos realizados por cualquier usuario, solo para rol administradores
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Lista de todos los pagos alguna vez realizados
 *       404:
 *         description: No se encontraron pagos realizados
 */
router.get("/admin/payments", authenticate, authorize("admin"), getAllPayments)

export default router;