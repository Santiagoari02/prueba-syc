import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import vigenciasRoutes from "./routes/vigenciasRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import authRoutes from "./routes/authRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/vehicles", vigenciasRoutes);
app.use("/payments", paymentRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("API en Node");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Swagger en http://localhost:${PORT}/api-docs"`);
});
