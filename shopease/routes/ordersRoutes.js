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
 *               customer_id:
 *                 type: string
 *               order_status:
 *                 type: string
 *               order_purchase_timestamp:
 *                 type: string
 *                 format: date-time
 *               order_approved_at:
 *                 type: string
 *                 format: date-time
 *               order_delivered_carrier_date:
 *                 type: string
 *                 format: date-time
 *               order_delivered_customer_date:
 *                 type: string
 *                 format: date-time
 *               order_estimated_delivery_date:
 *                 type: string
 *                 format: date-time
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
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get("/", getAllOrders);

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
 *           example: 53cdb2fc8bc7dce0b6741e2150273451
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
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               order_status:
 *                 type: string
 *               order_approved_at:
 *                 type: string
 *               order_delivered_carrier_date:
 *                 type: string
 *               order_delivered_customer_date:
 *                 type: string
 *               order_estimated_delivery_date:
 *                 type: string
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
 * @swagger
 * /orders/total-sales:
 *   get:
 *     summary: Get total sales
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Total sales value
 */
router.get("/total-sales", getTotalSales);

module.exports = router;