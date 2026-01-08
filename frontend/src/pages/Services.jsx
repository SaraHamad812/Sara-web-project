import { useEffect, useState } from "react";

import "./Services.css";
function Services() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
   const [comments, setComments] = useState("");
  const [editId, setEditId] = useState(null);

  /* Load services */
  const loadServices = () => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadServices();
  }, []);

  /* ADD or UPDATE service */
  const submitService = (e) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/services/${editId}`
      : "http://localhost:5000/api/services";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price) 
      })
    })
      .then(res => res.json())
      .then(() => {
        setName("");
        setPrice("");
        setComments("");
        setEditId(null);
        loadServices();
      })
      .catch(err => console.error(err));
  };

  /* Edit service */
  const editService = (service) => {
    setEditId(service.id);
    setName(service.name);
    setComments(service.comments);
    setPrice(service.price);
  };

  /* Delete service */
  const deleteService = (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    fetch(`http://localhost:5000/api/services/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => loadServices())
      .catch(err => console.error(err));
  };

  return (
    <div className="services-page">
      <h1 className="title">Salon Services</h1>

      {/* Form */}
      <div className="card">
        <h2>{editId ? "Edit Service" : "Add New Service"}</h2>

        <form onSubmit={submitService} className="service-form">
          <input
            type="text"
            placeholder="Service name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Service comments"
            value={comments}
            onChange={e => setComments(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price ($)"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />

          <button type="submit">
            {editId ? "Update Service" : "Add Service"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="card">
        <h2>Services List</h2>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Price</th>
              <th>comments</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No services found
                </td>
              </tr>
            ) : (
              services.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.comments}</td>
                  <td>${s.price}</td>
                  <td className="actions">
                    <button
                      className="edit"
                      type="button"
                      onClick={() => editService(s)}
                    >
                      ✏️
                    </button>

                    <button
                      className="delete"
                      type="button"
                      onClick={() => deleteService(s.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Services;
