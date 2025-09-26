"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserPassword = exports.loginUser = exports.registerUser = void 0;
// src/services/authService.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../config/db"));
const generateToken_1 = require("../utils/generateToken");
const registerUser = async (name, email, password) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const query = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES ($1, $2, $3, 'user')
    RETURNING id, name, email, role
  `;
    const values = [name, email, hashedPassword];
    const result = await db_1.default.query(query, values);
    return result.rows[0];
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await db_1.default.query(query, [email]);
    if (result.rowCount === 0)
        return null;
    const user = result.rows[0];
    const validPassword = await bcrypt_1.default.compare(password, user.password_hash);
    if (!validPassword)
        return null;
    const token = (0, generateToken_1.generateToken)(user.id, user.role);
    return { token };
};
exports.loginUser = loginUser;
const changeUserPassword = async (userId, currentPassword, newPassword) => {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await db_1.default.query(query, [userId]);
    if (result.rowCount === 0)
        throw new Error("Usuario no encontrado");
    const user = result.rows[0];
    const validPassword = await bcrypt_1.default.compare(currentPassword, user.password_hash);
    if (!validPassword)
        throw new Error("Contraseña actual incorrecta");
    const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
    await db_1.default.query("UPDATE users SET password_hash = $1 WHERE id = $2", [hashedPassword, userId]);
    return { message: "Contraseña actualizada correctamente" };
};
exports.changeUserPassword = changeUserPassword;
