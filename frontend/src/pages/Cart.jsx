import { useEffect, useState } from "react";
import "./Cart.css";
function Cart() {
  const [items, setItems] = useState([]);

  const loadCart = () => {
    fetch("http://localhost:5000/api/cart")
      .then(res => res.json())
      .then(data => setItems(data.items || []));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const changeQty = (id, change) => {
    fetch(`http://localhost:5000/api/cart/qty/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ change })
    }).then(loadCart);
  };

  const removeItem = id => {
    fetch(`http://localhost:5000/api/cart/${id}`, {
      method: "DELETE"
    }).then(loadCart);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} width="60" />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => changeQty(item.id, -1)}>➖</button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => changeQty(item.id, 1)}>➕</button>
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button onClick={() => removeItem(item.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;
