require("dotenv").config();
const app = require("./server.js");
var favicon = require("serve-favicon");
var path = require("path");

// Import Swagger packages
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Swagger configuration options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "tea-api",
      version: "1.0.0",
      description: "API documentation for Product and Category management",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3002}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// Initialize swagger-jsdoc with the configuration
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve the Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3002;
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
