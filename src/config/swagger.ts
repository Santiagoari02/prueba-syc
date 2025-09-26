// src/config/swagger.ts
import swaggerJsdoc, { SwaggerJSDocOptions } from "swagger-jsdoc";

const options: SwaggerJSDocOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API prueba SYC",
            version: "1.0.0",
            description: "Documentación de la API con Swagger + JWT",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        paths: {},
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
