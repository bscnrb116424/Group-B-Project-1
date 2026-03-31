const pool = require("../config/db");

/**
 * =========================
 * GET ALL CUSTOMERS (Paginated)
 * =========================
 */
const getCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // fixed as per products pattern
    const offset = (page - 1) * limit;

    const result = await pool.query(
      "SELECT * FROM customers LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    res.json({
      page,
      limit,
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * =========================
 * GET CUSTOMER BY ID
 * =========================
 */
const getCustomerById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers WHERE customer_id = $1",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * =========================
 * CREATE CUSTOMER
 * =========================
 */
const createCustomer = async (req, res) => {
  const {
    customer_id,
    customer_unique_id,
    customer_zip_code_prefix,
    customer_city,
    customer_state
  } = req.body;

  // Validate required fields
  if (!customer_id || !customer_unique_id || !customer_zip_code_prefix || !customer_city || !customer_state) {
    return res.status(400).json({ 
      error: "Missing required fields: customer_id, customer_unique_id, customer_zip_code_prefix, customer_city, customer_state" 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO customers 
      (customer_id, customer_unique_id, customer_zip_code_prefix, customer_city, customer_state) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [customer_id, customer_unique_id, customer_zip_code_prefix, customer_city, customer_state]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * =========================
 * UPDATE CUSTOMER
 * =========================
 */
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const {
    customer_unique_id,
    customer_zip_code_prefix,
    customer_city,
    customer_state
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE customers 
       SET customer_unique_id = COALESCE($1, customer_unique_id),
           customer_zip_code_prefix = COALESCE($2, customer_zip_code_prefix),
           customer_city = COALESCE($3, customer_city),
           customer_state = COALESCE($4, customer_state)
       WHERE customer_id = $5
       RETURNING *`,
      [customer_unique_id, customer_zip_code_prefix, customer_city, customer_state, id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * =========================
 * DELETE CUSTOMER
 * =========================
 */
const deleteCustomer = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM customers WHERE customer_id = $1 RETURNING *",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ 
      message: "Customer deleted successfully",
      data: result.rows[0] 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * =========================
 * GET CUSTOMER BY UNIQUE ID
 * =========================
 */
const getCustomerByUniqueId = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers WHERE customer_unique_id = $1",
      [req.params.unique_id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * =========================
 * GET CUSTOMERS BY STATE
 * =========================
 */
// const getCustomersByState = async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT * FROM customers WHERE customer_state = $1 ORDER BY customer_city",
//       [req.params.state]
//     );

//     res.json({
//       state: req.params.state,
//       count: result.rows.length,
//       data: result.rows
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerByUniqueId,
//   getCustomersByState
};