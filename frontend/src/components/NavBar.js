import React from 'react'
import {Link} from 'react-router-dom';
import '../styles/styles.css';

function NavBar() {
  return (
    <nav className="main-nav">
        <img src="/assets/Logo.jpg" alt="Salon Logo" class="logo" />

        <span class="brand-name">Blossom Salon</span>
                <Link to="/">Home</Link>

                <Link to="/services">Services</Link>
                <Link to="/booking">Book</Link>
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/cart">Cart</Link>

                <Link className="btn-primary" to="/booking">Book Now</Link>

                
              </nav>
        
  );
}
export default NavBar