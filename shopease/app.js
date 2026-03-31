require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require("./routes/products");
// const orderItemsRoutes = require("./routes/orderItemsRoutes");
// const ordersRoutes = require("./routes/ordersRoutes");
const customerRoutes = require("./routes/customerRoutes");

app.use("/products", productRoutes);
// app.use("/order-items", orderItemsRoutes);
// app.use("/orders", ordersRoutes);
app.use("/customers", customerRoutes); 

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});