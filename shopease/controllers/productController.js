const pool = require("../config/db");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // fixed as you requested
    const offset = (page - 1) * limit;

    const result = await pool.query(
      "SELECT * FROM products LIMIT $1 OFFSET $2",
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

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Add product
exports.createProduct = async (req, res) => {
  const { name, price, stock_quantity, category } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO products (name, price, stock_quantity, category) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, price, stock_quantity, category]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const { name, price, stock_quantity, category } = req.body;

  try {
    const result = await pool.query(
      "UPDATE products SET name=$1, price=$2, stock_quantity=$3, category=$4 WHERE product_id=$5 RETURNING *",
      [name, price, stock_quantity, category, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE product_id=$1", [req.params.id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};