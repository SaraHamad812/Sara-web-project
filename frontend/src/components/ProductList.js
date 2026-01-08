import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ products, cart, setCart }) {
  return (
    <div className="products-grid">
      {products.map(item => (
        <ProductItem
          key={item.id}
          product={item}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
