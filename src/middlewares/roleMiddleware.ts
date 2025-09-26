// src/middlewares/roleMiddleware.ts
import { Request, Response, NextFunction } from "express";

export const authorize = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user || user.role !== role) {
            return res.status(403).json({ error: "No autorizado" });
        }
        next();
    };
};
