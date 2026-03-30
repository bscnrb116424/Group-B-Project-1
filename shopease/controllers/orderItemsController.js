const pool = require("../config/db");

/**
 * =========================
 * CREATE ORDER ITEM
 * =========================
 */
const createOrderItem = async (req, res) => {
  try {
    const {
      order_id,
      product_id,
      seller_id,
      shipping_limit_date,
      price,
      freight_value,
    } = req.body;

    // ✅ SAFE timestamp handling (no forced casting crash)
    const result = await pool.query(
      `INSERT INTO order_items
      (order_id, product_id, seller_id, shipping_limit_date, price, freight_value)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        order_id,
        product_id,
        seller_id,
        shipping_limit_date || null,
        price,
        freight_value,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create order item",
      details: err.message,
    });
  }
};

/**
 * =========================
 * GET ALL ORDER ITEMS
 * =========================
 */
const getAllOrderItems = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM order_items ORDER BY order_item_id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch order items",
      details: err.message,
    });
  }
};

/**
 * =========================
 * GET BY ID
 * =========================
 */
const getOrderItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM order_items WHERE order_item_id = $1",
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Order item not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch order item",
      details: err.message,
    });
  }
};

/**
 * =========================
 * UPDATE ORDER ITEM
 * =========================
 */
const updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const { price, freight_value, shipping_limit_date } = req.body;

  try {
    const result = await pool.query(
      `UPDATE order_items
       SET price = COALESCE($1, price),
           freight_value = COALESCE($2, freight_value),
           shipping_limit_date = COALESCE($3, shipping_limit_date)
       WHERE order_item_id = $4
       RETURNING *`,
      [price, freight_value, shipping_limit_date || null, id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Order item not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Failed to update order item",
      details: err.message,
    });
  }
};

/**
 * =========================
 * DELETE ORDER ITEM
 * =========================
 */
const deleteOrderItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM order_items WHERE order_item_id = $1 RETURNING *",
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Order item not found" });
    }

    res.json({
      message: "Deleted successfully",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete order item",
      details: err.message,
    });
  }
};

/**
 * =========================
 * GET ITEMS BY ORDER ID
 * =========================
 */
const getItemsByOrder = async (req, res) => {
  const { order_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM order_items WHERE order_id = $1",
      [order_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch order items by order",
      details: err.message,
    });
  }
};

/**
 * =========================
 * GET ORDER TOTAL
 * =========================
 */
const getOrderTotal = async (req, res) => {
  const { order_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT COALESCE(
          SUM(COALESCE(price,0) + COALESCE(freight_value,0)),
          0
        ) AS total
       FROM order_items
       WHERE order_id = $1`,
      [order_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Failed to calculate order total",
      details: err.message,
    });
  }
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
  getItemsByOrder,
  getOrderTotal,
};