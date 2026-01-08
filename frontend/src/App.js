import './App.css';

import React, { useState } from "react";

// import components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Header from './components/Header';

// import pages
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/products" element={<Products cart={cart} setCart={setCart} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
