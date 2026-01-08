const db = require("../db");

//Get current cart (order) 
exports.getCart = (req, res) => {
  db.query(
    "SELECT * FROM orders WHERE status='cart' LIMIT 1",
    (err, orders) => {
      if (err) return res.status(500).json(err);

      if (orders.length === 0) {
        // create new cart
        db.query(
          "INSERT INTO orders (status) VALUES ('cart')",
          (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId, items: [] });
          }
        );
      } else {
        const orderId = orders[0].id;

        db.query(
          `SELECT oi.id, oi.quantity, oi.price,
                  p.name, p.image
           FROM order_items oi
           JOIN products p ON oi.product_id = p.id
           WHERE oi.order_id = ?`,
          [orderId],
          (err, items) => {
            if (err) return res.status(500).json(err);
            res.json({ id: orderId, items });
          }
        );
      }
    }
  );
};

// Add product to cart
exports.addToCart = (req, res) => {
  const { product_id, price } = req.body;

  
  db.query(
    "SELECT * FROM orders WHERE status='cart' LIMIT 1",
    (err, orders) => {
      if (err) return res.status(500).json(err);

      const createCart = (orderId) => {
        db.query(
          "SELECT * FROM order_items WHERE order_id=? AND product_id=?",
          [orderId, product_id],
          (err, rows) => {
            if (rows.length > 0) {
              // Increase quantity
              db.query(
                "UPDATE order_items SET quantity = quantity + 1 WHERE id=?",
                [rows[0].id],
                () => res.json({ message: "Quantity updated" })
              );
            } else {
              // Insert new item
              db.query(
                "INSERT INTO order_items (order_id, product_id, price, quantity) VALUES (?, ?, ?, 1)",
                [orderId, product_id, price],
                () => res.json({ message: "Added to cart" })
              );
            }
          }
        );
      };

      if (orders.length === 0) {
       
        db.query(
          "INSERT INTO orders (status) VALUES ('cart')",
          (err, result) => {
            if (err) return res.status(500).json(err);
            createCart(result.insertId);
          }
        );
      } else {
        createCart(orders[0].id);
      }
    }
  );
};
// UPDATE QUANTITY (+ / -) 
exports.updateQuantity = (req, res) => {
  const id = Number(req.params.id);
  const change = Number(req.body.change); // +1 or -1

  if (![1, -1].includes(change)) {
    return res.status(400).json({ message: "Invalid change value" });
  }

  db.query(
    "SELECT quantity FROM order_items WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length === 0) return res.status(404).json({ message: "Item not found" });

      const newQty = rows[0].quantity + change;

      if (newQty <= 0) {
        // remove item
        db.query(
          "DELETE FROM order_items WHERE id = ?",
          [id],
          () => res.json({ message: "Item removed" })
        );
      } else {
        // update quantity
        db.query(
          "UPDATE order_items SET quantity = ? WHERE id = ?",
          [newQty, id],
          () => res.json({ message: "Quantity updated", quantity: newQty })
        );
      }
    }
  );
};


exports.removeFromCart = (req, res) => {
  db.query(
    "DELETE FROM order_items WHERE id=?",
    [req.params.id],
    () => res.json({ message: "Removed" })
  );
};
