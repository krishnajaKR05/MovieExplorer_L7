import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Explorer API",
      version: "1.0.0",
      description: "API to explore movies, actors, directors, and genres",
    },
  },
  apis: ["./src/routes/routes.js"],
};

const specs = swaggerJsDoc(options);

export { swaggerUi, specs };
