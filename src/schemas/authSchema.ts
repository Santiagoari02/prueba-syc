import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener mínimo 2 caracteres"),
    email: z.string().email("Correo inválido"),
    password: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
            "La contraseña debe contener al menos una mayúscula, una minúscula y un número."
        ),
});

export const loginSchema = z.object({
    email: z.string().email("Correo inválido"),
    password: z.string().min(6),
});

export const changePasswordSchema = z.object({
    newPassword: z.string()
        .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
            "La contraseña debe contener al menos una mayúscula, una minúscula y un número."
        ),
});
