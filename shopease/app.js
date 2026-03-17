const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/products");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});