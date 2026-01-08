const db = require("../db");

// GET messages 
exports.getMessages = (req, res) => {
  db.query(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
};

//ADD message 
exports.addMessage = (req, res) => {
  const { name, email, age, message } = req.body;

  db.query(
    "INSERT INTO contact_messages (name, email, age, message) VALUES (?, ?, ?, ?)",
    [name, email, Number(age), message],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Message saved", id: result.insertId });
    }
  );
};

//DELETE message 
exports.deleteMessage = (req, res) => {
  db.query(
    "DELETE FROM contact_messages WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Message removed" });
    }
  );
};
