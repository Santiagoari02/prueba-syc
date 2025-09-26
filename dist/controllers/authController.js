"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await (0, authService_1.registerUser)(name, email, password);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Error en el registro" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, authService_1.loginUser)(email, password);
        if (!result)
            return res.status(400).json({ error: "Credenciales inválidas" });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Error en login" });
    }
};
exports.login = login;
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = req.user;
        const result = await (0, authService_1.changeUserPassword)(user.id, currentPassword, newPassword);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.changePassword = changePassword;
