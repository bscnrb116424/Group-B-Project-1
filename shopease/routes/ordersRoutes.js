const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByCustomer,
  getTotalSales,
} = require("../controllers/ordersController");

/**
 * =========================
 * ORDERS TAG
 * =========================
 */
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Orders management APIs
 */

/**
 * =========================
 * CREATE ORDER
 * =========================
 */
/**
 /**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - customer_id
 *             properties:
 *               order_id:
 *                 type: string
 *                 example: "53cdb2fc8bc7dce0b6741e2150273451"
 *               customer_id:
 *                 type: string
 *                 example: "9ef432eb6251297304e76186b10a928d"
 *               order_status:
 *                 type: string
 *                 example: "delivered"
 *               order_purchase_timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2029-04-01 09:30:00"
 *               order_approved_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2029-04-01 10:00:00"
 *               order_delivered_carrier_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2029-04-03 08:00:00"
 *               order_delivered_customer_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2029-04-04 15:30:00"
 *               order_estimated_delivery_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2029-04-05 18:00:00"
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/", createOrder);

/**
 * =========================
 * GET ALL ORDERS
 * =========================
 */
/**
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "47770eb9100c2d0c44946d9cf07ec65d"
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get("/:id", getOrderById);

/**
 * =========================
 * UPDATE ORDER
 * =========================
 */
/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "47770eb9100c2d0c44946d9cf07ec65d"
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customer_id: "41ce2a54c0b03bf3443c3d931a367089"
 *             order_status: "delivered"
 *             order_approved_at: "2029-04-03"
 *             order_delivered_carrier_date: "03-04-2029"
 *             order_delivered_customer_date: "03-04-2029"
 *             order_estimated_delivery_date: "03-04-2029"
 *     responses:
 *       200:
 *         description: Order updated
 *       404:
 *         description: Order not found
 */
router.put("/:id", updateOrder);

/**
 * =========================
 * DELETE ORDER
 * =========================
 */
/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 53cdb2fc8bc7dce0b6741e2150273451
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete("/:id", deleteOrder);

/**
 * =========================
 * GET ORDERS BY CUSTOMER
 * =========================
 */
/**
 /**
 * @swagger
 * /orders/customer/{customer_id}:
 *   get:
 *     summary: Get orders by customer
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: string
 *           example: 9ef432eb6251297304e76186b10a928d
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer orders fetched
 */
router.get("/customer/:customer_id", getOrdersByCustomer);

/**
 * =========================
 * TOTAL SALES
 * =========================
 */
/**

 *   get:
 *     summary: Get total sales
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Total sales value
 */
router.get("/total-sales", getTotalSales);

module.exports = router;