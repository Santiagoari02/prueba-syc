import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
    (schema: z.ZodSchema<any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error: unknown) {
                if (error instanceof ZodError) {
                    return res.status(400).json({
                        errors: error.issues.map((issue) => issue.message),
                    });

                }

                return res.status(500).json({
                    message: "Ocurrió un error en el servidor",
                });
            }
        };
