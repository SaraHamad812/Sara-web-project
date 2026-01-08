import React from 'react';
import '../styles/styles.css';

function Footer() {
    
  return (
    <footer className="site-footer">
        <div className="container footer-inner">
          <p>&copy; {new Date().getFullYear()} Blossom Salon. All rights reserved.</p>
          
        </div>
      </footer>
      );
}
export default Footer;