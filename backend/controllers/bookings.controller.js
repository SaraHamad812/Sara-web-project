const db = require("../db");


exports.createBooking = (req, res) => {
  console.log("📥 BOOKING BODY:", req.body); 

  const { customer_name, phone, service_id, booking_date, booking_time } = req.body;

  db.query(
    `INSERT INTO bookings 
     (customer_name, phone, service_id, booking_date, booking_time)
     VALUES (?, ?, ?, ?, ?)`,
    [customer_name, phone, service_id, booking_date, booking_time],
    (err, result) => {
      if (err) {
        console.error("❌ BOOKING ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Booking created", id: result.insertId });
    }
  );
};



exports.getBookings = (req, res) => {
  db.query(
    `SELECT b.id, b.customer_name, b.phone, 
            b.booking_date, b.booking_time,
            s.name AS service_name
     FROM bookings b
     JOIN services s ON b.service_id = s.id
     ORDER BY b.booking_date, b.booking_time`,
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
};

exports.updateBooking = (req, res) => {
  const { customer_name, phone, service_id, booking_date, booking_time } = req.body;
  const id = Number(req.params.id);

  console.log("📤 UPDATE BOOKING REQUEST:", {
    id,
    customer_name,
    phone,
    service_id,
    booking_date,
    booking_time
  });

  db.query(
    `UPDATE bookings
     SET customer_name = ?, phone = ?, service_id = ?, booking_date = ?, booking_time = ?
     WHERE id = ?`,
    [
      customer_name,
      phone,
      Number(service_id),
      booking_date,
      booking_time,
      id
    ],
    (err, result) => {
      if (err) {
        console.error("❌ UPDATE ERROR:", err);
        return res.status(500).json(err);
      }

      console.log("✅ UPDATE RESULT:", result);

      res.json({
        message: "Booking updated",
        affectedRows: result.affectedRows
      });
    }
  );
};


exports.deleteBooking = (req, res) => {
  const id = Number(req.params.id);

  db.query(
    "DELETE FROM bookings WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Booking deleted" });
    }
  );
};