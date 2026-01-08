import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import "./Products.css";

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  /* Load products */
  const loadProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(setProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* Handle form */
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ADD or UPDATE */
  const submitProduct = e => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/products/${editId}`
      : "http://localhost:5000/api/products";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price)
      })
    })
      .then(res => res.json())
      .then(() => {
        setEditId(null);
        setForm({ name: "", description: "", price: "", image: "" });
        loadProducts();
      });
  };

  /* ✏️ EDIT */
  const editProduct = product => {
    setEditId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image
    });
  };

  /* 🗑️ DELETE */
  const deleteProduct = id => {
    if (!window.confirm("Delete this product?")) return;

    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE"
    }).then(loadProducts);
  };

  return (
    <div className="products-page">

      {/* ADD / EDIT FORM */}
      <section className="section">
        <div className="container add-product-card">
          <h2>{editId ? "Edit Product" : "Add Product"}</h2>

          <form onSubmit={submitProduct} className="add-product-form">
            <input name="name" placeholder="Product name" value={form.name} onChange={handleChange} required />
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
            <input name="image" placeholder="Image path" value={form.image} onChange={handleChange} />

            <button>
              {editId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      </section>

      {/* PRODUCT LIST */}
      <section className="section">
        <div className="container">
          <div className="products-grid">
            {products.map(p => (
              <div key={p.id} className="product-wrapper">
                <div onClick={() => editProduct(p)}>
                  <ProductList products={[p]} cart={cart} setCart={setCart} />
                </div>

                <div className="product-actions">
                  <button onClick={() => editProduct(p)}>✏️ Edit</button>
                  <button onClick={() => deleteProduct(p.id)}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Products;
