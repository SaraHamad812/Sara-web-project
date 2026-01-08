const db = require("../db");

//GET ALL SERVICES 
exports.getServices = (req, res) => {
  db.query("SELECT * FROM services", (err, rows) => {
    if (err) {
      console.error("GET ERROR:", err);
      return res.status(500).json(err);
    }
    res.json(rows);
  });
};

// ADD SERVICE 
exports.addService = (req, res) => {
  const { name, price } = req.body;

  db.query(
    "INSERT INTO services (name, price, comments) VALUES (?, ?, ?)",
    [name, Number(price), comments],
    (err, result) => {
      if (err) {
        console.error("INSERT ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Service added", id: result.insertId });
    }
  );
};

// UPDATE SERVICE 
exports.updateService = (req, res) => {
  const { name, price, comments } = req.body;
  const id = Number(req.params.id);

  console.log("UPDATE REQUEST:", { id, name, price, comments });

  db.query(
    "UPDATE services SET name = ?, price = ?, comments = ?, WHERE id = ?",
    [name, Number(price),comments, id],
    (err, result) => {
      if (err) {
        console.error("UPDATE ERROR:", err);
        return res.status(500).json(err);
      }

      console.log("UPDATE RESULT:", result);

      res.json({
        message: "Service updated",
        affectedRows: result.affectedRows
      });
    }
  );
};

// DELETE SERVICE 
exports.deleteService = (req, res) => {
  const id = Number(req.params.id);

  db.query(
    "DELETE FROM services WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("DELETE ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Service deleted" });
    }
  );
};
