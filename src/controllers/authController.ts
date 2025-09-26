// src/controllers/authController.ts
import { Request, Response } from "express";
import { registerUser, loginUser, changeUserPassword } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error en el registro" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        if (!result) return res.status(400).json({ error: "Credenciales inválidas" });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error en el login" });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = (req as any).user;

        const result = await changeUserPassword(user.id, currentPassword, newPassword);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
