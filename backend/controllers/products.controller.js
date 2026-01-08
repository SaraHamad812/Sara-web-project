const db = require("../db");

// GET PRODUCTS 
exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

//ADD PRODUCT 
exports.addProduct = (req, res) => {
  const { name, description, price, image } = req.body;

  db.query(
    "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
    [name, description, Number(price), image],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product added", id: result.insertId });
    }
  );
};

// UPDATE PRODUCT 
exports.updateProduct = (req, res) => {
  const { name, description, price, image } = req.body;
  const id = Number(req.params.id);

  db.query(
    "UPDATE products SET name=?, description=?, price=?, image=? WHERE id=?",
    [name, description, Number(price), image, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ affectedRows: result.affectedRows });
    }
  );
};

// DELETE PRODUCT 
exports.deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  db.query(
    "DELETE FROM products WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product deleted" });
    }
  );
};
