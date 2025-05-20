import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simulate Plane API",
      version: "1.0.0",
      description: "模擬飛機操作與資料傳輸 API 文件",
    },
    servers: [
      {
        url: "http://localhost:3031",
        description: "開發伺服器",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // 掃描路由註解
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
