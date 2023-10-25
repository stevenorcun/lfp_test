const swaggerJsdoc = require("swagger-jsdoc");
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "LFP API documentation of Node.js Express project",
    },
  },
  apis: [path.join(__dirname, "../routes/*.routes.ts")],
};

export const swaggerSpec = swaggerJsdoc(options);
