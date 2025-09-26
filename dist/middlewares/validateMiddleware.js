"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                errors: error.issues.map((issue) => issue.message),
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error en el servidor",
        });
    }
};
exports.validate = validate;
