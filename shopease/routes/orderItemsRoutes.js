const express = require("express");
const router = express.Router();

const {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
  getItemsByOrder,
  getOrderTotal,
} = require("../controllers/orderItemsController");

/**
 * =========================
 * SWAGGER TAGS
 * =========================
 */
/**
 * @swagger
 * tags:
 *   name: OrderItems
 *   description: Order items management
 */

/**
 * =========================
 * CREATE ORDER ITEM
 * =========================
 */
/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Create a new order item
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - product_id
 *               - seller_id
 *               - price
 *               - freight_value
 *             properties:
 *               order_id:
 *                 type: string
 *                 example: "00010242fe8c5a6d1ba2dd792cb16214"
 *               product_id:
 *                 type: string
 *                 example: "4244733e06e7ecb4970a6e2683c13e61"
 *               seller_id:
 *                 type: string
 *                 example: "48436dade18ac8b2bce089ec2a041202"
 *               shipping_limit_date:
 *                 type: string
 *                 example: "2017-09-19 09:45:35"
 *               price:
 *                 type: number
 *                 example: 58.90
 *               freight_value:
 *                 type: number
 *                 example: 13.29
 *     responses:
 *       201:
 *         description: Order item created
 */
router.post("/", createOrderItem);

/**
 * =========================
 * GET ALL ORDER ITEMS
 * =========================
 */
/**
router.get("/order/:order_id", getItemsByOrder);

/**
 * =========================
 * GET ORDER TOTAL
 */
router.get("/order/:order_id/total", getOrderTotal);

/**
 * =========================
 * GET BY ID
 */
/**
 * @swagger
 * /order-items/{id}:
 *   get:
 *     summary: Get order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single order item
 */
router.get("/:id", getOrderItemById);

/**
 * =========================
 * UPDATE ORDER ITEM
 */
/**
 * @swagger
 * /order-items/{id}:
 *   put:
 *     summary: Update order item
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               freight_value:
 *                 type: number
 *               shipping_limit_date:
 *                 type: string
 *                 example: "2017-09-19 09:45:35"
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/:id", updateOrderItem);

/**
 * =========================
 * DELETE ORDER ITEM
 */
/**
 * @swagger
 * /order-items/{id}:
 *   delete:
 *     summary: Delete order item
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:id", deleteOrderItem);

module.exports = router;