const pool = require("../config/db");

/**
 * =========================
 * CREATE ORDER
 * =========================
 */
const createOrder = async (req, res) => {
  try {
    const {
      order_id,
      customer_id,
      order_status,
      order_purchase_timestamp,
      order_approved_at,
      order_delivered_carrier_date,
      order_delivered_customer_date,
      order_estimated_delivery_date,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO orders (
        order_id,
        customer_id,
        order_status,
        order_purchase_timestamp,
        order_approved_at,
        order_delivered_carrier_date,
        order_delivered_customer_date,
        order_estimated_delivery_date
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        order_id,
        customer_id,
        order_status || "pending",
        order_purchase_timestamp || null,
        order_approved_at || null,
        order_delivered_carrier_date || null,
        order_delivered_customer_date || null,
        order_estimated_delivery_date || null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create order",
      details: err.message,
    });
  }
};

/**
 * =========================
 * GET ALL ORDERS
 * =========================
 */
const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY order_purchase_timestamp DESC"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch orders",
      details: err.message,
    });
  }
};

/**
 * =========================
 * GET ORDER BY ID
 * =========================
 */
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE order_id = $1",
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch order",
      details: err.message,
    });
  }
};

/**
 * =========================
 * UPDATE ORDER
 * =========================
 */
const updateOrder = async (req, res) => {
  const { id } = req.params;

  const {
    customer_id,
    order_status,
    order_approved_at,
    order_delivered_carrier_date,
    order_delivered_customer_date,
    order_estimated_delivery_date,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE orders
       SET customer_id = COALESCE($1, customer_id),
           order_status = COALESCE($2, order_status),
           order_approved_at = COALESCE($3, order_approved_at),
           order_delivered_carrier_date = COALESCE($4, order_delivered_carrier_date),
           order_delivered_customer_date = COALESCE($5, order_delivered_customer_date),
           order_estimated_delivery_date = COALESCE($6, order_estimated_delivery_date)
       WHERE order_id = $7
       RETURNING *`,
      [
        customer_id,
        order_status,
        order_approved_at || null,
        order_delivered_carrier_date || null,
        order_delivered_customer_date || null,
        order_estimated_delivery_date || null,
        id,
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Failed to update order",
      details: err.message,
    });
  }
};

/**
 * =========================
 * DELETE ORDER
 * =========================
 */
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM orders WHERE order_id = $1 RETURNING *",
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      message: "Order deleted successfully",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete order",
      details: err.message,
    });
  }
};

/**
 * =========================
 * GET ORDERS BY CUSTOMER
 * =========================
 */
const getOrdersByCustomer = async (req, res) => {
  const { customer_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE customer_id = $1",
      [customer_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch customer orders",
      details: err.message,
    });
  }
};

/**
 * =========================
 * GET TOTAL SALES
 * =========================
 */
const getTotalSales = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COALESCE(SUM(COALESCE(total_amount,0)),0) AS total_sales FROM orders"
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Failed to calculate total sales",
      details: err.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByCustomer,
  getTotalSales,
};