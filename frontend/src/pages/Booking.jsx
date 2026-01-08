import { useEffect, useState } from "react";
import "./Booking.css";

function Booking() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    service_id: "",
    booking_date: "",
    booking_time: ""
  });

  // Load services 
  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(setServices);
  }, []);

  // Load bookings 
  const loadBookings = () => {
    fetch("http://localhost:5000/api/bookings")
      .then(res => res.json())
      .then(setBookings);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD or UPDATE 
  const submitBooking = e => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/bookings/${editId}`
      : "http://localhost:5000/api/bookings";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        service_id: Number(form.service_id)
      })
    })
      .then(res => res.json())
      .then(() => {
        setEditId(null);
        setForm({
          customer_name: "",
          phone: "",
          service_id: "",
          booking_date: "",
          booking_time: ""
        });
        loadBookings();
      });
  };

  // EDIT 
  const editBooking = b => {
  setEditId(b.id);

  setForm({
    customer_name: b.customer_name,
    phone: b.phone,
    service_id: b.service_id,
    booking_date: b.booking_date.split("T")[0],
    booking_time: b.booking_time
  });
};

  // DELETE 
  const deleteBooking = id => {
    if (!window.confirm("Delete this booking?")) return;

    fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "DELETE"
    }).then(loadBookings);
  };

  return (
    <div className="booking-page">
      <h1>Book Appointment</h1>

      
      <form className="booking-card" onSubmit={submitBooking}>
        <input name="customer_name" placeholder="Name" value={form.customer_name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />

        <select name="service_id" value={form.service_id} onChange={handleChange} required>
          <option value="">Select Service</option>
          {services.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <input type="date" name="booking_date" value={form.booking_date} onChange={handleChange} required />
        <input type="time" name="booking_time" value={form.booking_time} onChange={handleChange} required />

        <button>{editId ? "Update Booking" : "Book Now"}</button>
      </form>

        
      <div className="booking-list">
        <h2>Bookings</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.customer_name}</td>
                <td>{b.service_name}</td>
                <td>{b.booking_date.split("T")[0]}</td>
                <td>{b.booking_time}</td>
                <td>
                  <button onClick={() => editBooking(b)}>✏️</button>
                  <button onClick={() => deleteBooking(b.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Booking;
