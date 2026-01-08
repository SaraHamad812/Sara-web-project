import React from "react";

function ProductItem({ product, cart, setCart }) {

  const addToCart = () => {
  fetch("http://localhost:5000/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_id: product.id,
      price: product.price
    })
  }).then(() => alert("Added to cart"));
};


  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} 
       
  />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">${product.price}</div>

      <button className="btn-primary" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;
