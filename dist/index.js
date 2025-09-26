"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const vigenciasRoutes_1 = __importDefault(require("./routes/vigenciasRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use("/auth", authRoutes_1.default);
app.use("/vehicles", vigenciasRoutes_1.default);
app.use("/payments", paymentRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API en Node");
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Swagger en http://localhost:${PORT}/api-docs"`);
});
