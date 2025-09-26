"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
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
router.get("/me", authMiddleware_1.authenticate, paymentController_1.getPaymentsByUserID);
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
router.get("/admin/payments", authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)("admin"), paymentController_1.getAllPayments);
exports.default = router;
