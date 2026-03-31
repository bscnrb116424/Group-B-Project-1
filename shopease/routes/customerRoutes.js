const express = require("express");
const router = express.Router();
const controller = require("../controllers/customerController");

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management APIs
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers (paginated, 20 per page)
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default = 1)
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get("/", controller.getCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer found
 *       404:
 *         description: Customer not found
 */
router.get("/:id", controller.getCustomerById);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - customer_unique_id
 *               - customer_zip_code_prefix
 *               - customer_city
 *               - customer_state
 *             properties:
 *               customer_id:
 *                 type: string
 *                 example: "9ef432eb6251297304e76186b10a928d"
 *               customer_unique_id:
 *                 type: string
 *                 example: "a5eeb001ff44ebf808aee1f2b4c9546e"
 *               customer_zip_code_prefix:
 *                 type: string
 *                 example: "12345"
 *               customer_city:
 *                 type: string
 *                 example: "Sao Paulo"
 *               customer_state:
 *                 type: string
 *                 example: "SP"
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Missing required fields
 */
router.post("/", controller.createCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_unique_id:
 *                 type: string
 *               customer_zip_code_prefix:
 *                 type: string
 *               customer_city:
 *                 type: string
 *               customer_state:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 */
router.put("/:id", controller.updateCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */
router.delete("/:id", controller.deleteCustomer);

/**
 * @swagger
 * /customers/unique/{unique_id}:
 *   get:
 *     summary: Get customers by unique ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: unique_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer unique ID
 *     responses:
 *       200:
 *         description: Customers found
 *       404:
 *         description: Customer not found
 */
router.get("/unique/:unique_id", controller.getCustomerByUniqueId);



module.exports = router;