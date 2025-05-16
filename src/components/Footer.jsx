import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
  <div className="footer-container">
    
    <div className="footer-section">
      <h4>ClassicShop</h4>
      <p>Bringing you quality products at the best prices.</p>
    </div>

    <div className="footer-section">
      <h5>Why ClassicShop?</h5>
      <ul>
        <li>✅ Quality Products at Best Prices</li>
        <li>🚚 Fast & Free Delivery</li>
        <li>🔄 Easy Returns within 7 Days</li>
        <li>💳 Secure Payment Gateway</li>
      </ul>
    </div>

    <div className="footer-section">
      <h5>Contact</h5>
      <p>Email: support@classicshop.com</p>
      {/* <p>Phone: +91 98765 43210</p> */}
      <p>Phone : +91 7440786288</p>
    </div>

  </div>
  <div className="footer-bottom">
    &copy; {new Date().getFullYear()} ClassicShop. All rights reserved.
  </div>
</footer>

  );
}

export default Footer;
