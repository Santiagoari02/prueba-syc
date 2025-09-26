// src/services/authService.ts
import bcrypt from "bcrypt";
import pool from "../config/db";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES ($1, $2, $3, 'user')
    RETURNING id, name, email, role
  `;
    const values = [name, email, hashedPassword];
    const result = await pool.query(query, values);

    return result.rows[0];
};

export const loginUser = async (email: string, password: string) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    if (result.rowCount === 0) return null;

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return null;

    const token = generateToken(user.id, user.role);
    return { token };
};

export const changeUserPassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
) => {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [userId]);

    if (result.rowCount === 0) throw new Error("Usuario no encontrado");

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!validPassword) throw new Error("Contraseña actual incorrecta");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [hashedPassword, userId]);

    return { message: "Contraseña actualizada correctamente" };
};
