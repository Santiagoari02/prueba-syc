"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "El nombre debe tener mínimo 2 caracteres"),
    email: zod_1.z.string().email("Correo inválido"),
    password: zod_1.z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, "La contraseña debe contener al menos una mayúscula, una minúscula y un número."),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Correo inválido"),
    password: zod_1.z.string().min(6),
});
exports.changePasswordSchema = zod_1.z.object({
    newPassword: zod_1.z.string()
        .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, "La contraseña debe contener al menos una mayúscula, una minúscula y un número."),
});
