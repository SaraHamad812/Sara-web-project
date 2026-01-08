import React from "react";
import { Link } from "react-router-dom"; 
import '../styles/styles.css';



function Home() {
  return (
    <div className="Home">

      

      
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1>Welcome to Blossom Salon</h1>
            <p>Your beauty, our passion. Book your appointment today!</p>
            <Link to="/booking" className="btn-primary">Book an Appointment</Link>
          </div>
          <div className="hero-photo">
            <img src="/assets/home.jpg" alt="Home banner" />

          </div>
        </div>
      </section>

      
      <section className="section">
        <div className="container">
          <h2>About Us</h2>
          <p>
            Blossom Salon offers premium hair, skin, and nail care services. 
            Our expert stylists are here to pamper you and enhance your natural beauty.
          </p>
        </div>
      </section>

      

    </div>
  );
}

export default Home;
