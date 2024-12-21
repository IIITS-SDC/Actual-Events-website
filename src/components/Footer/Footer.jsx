import React from 'react';
import './Footer.css'; // Change to SCSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        
        {/* Social Links */}
        <div className="social-links">
          <a 
            href=" " 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
          >
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </a>

          <a 
            href=" " 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
          >
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
        </div>

        {/* Footer Text */}
        <p className="footer-text">© 2024 Event_Website IIIT Sri City. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
