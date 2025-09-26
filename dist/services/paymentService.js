"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPaymentsService = exports.getPaymentsByUserIdService = void 0;
const db_1 = __importDefault(require("../config/db"));
const getPaymentsByUserIdService = async (userId) => {
    const query = "SELECT * FROM payments WHERE user_id = $1";
    const result = await db_1.default.query(query, [userId]);
    return result.rows;
};
exports.getPaymentsByUserIdService = getPaymentsByUserIdService;
const getAllPaymentsService = async () => {
    const query = "SELECT * FROM payments";
    const result = await db_1.default.query(query);
    return result.rows;
};
exports.getAllPaymentsService = getAllPaymentsService;
