import React, { useEffect, useState } from "react";
import "../styles/styles.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    message: ""
  });

  const [messages, setMessages] = useState([]);

  /* Load messages from DB */
  const loadMessages = () => {
    fetch("http://localhost:5000/api/contact")
      .then(res => res.json())
      .then(setMessages);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  /* Submit message */
  const handleSubmit = (e) => {
    e.preventDefault();

    const allFilled = Object.values(formData).every(val => val.toString().trim() !== "");
    if (!allFilled) {
      alert("Please fill all fields.");
      return;
    }

    fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        setFormData({ name: "", email: "", age: "", message: "" });
        loadMessages();
      });
  };

  /* Remove message */
  const handleRemove = (id) => {
    fetch(`http://localhost:5000/api/contact/${id}`, {
      method: "DELETE"
    }).then(loadMessages);
  };

  return (
    <div className="contact">
      <main>

        <section className="hero">
          <div className="container">
            <h1>Contact Us</h1>
            <p>We're here for you — reach out for inquiries, bookings, or beauty advice anytime.</p>
          </div>
        </section>

        <section className="contact-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="age"
              placeholder="Your Age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Message</button>
          </form>
        </section>

        {messages.length > 0 && (
          <section className="section">
            <div className="container">
              <h2>Received Messages</h2>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id}>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.age}</td>
                      <td>{msg.message}</td>
                      <td>
                        <button
                          className="btn-primary"
                          onClick={() => handleRemove(msg.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </section>
        )}

      </main>
    </div>
  );
}

export default Contact;
