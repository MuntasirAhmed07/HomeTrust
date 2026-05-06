import React from 'react';
import facebook from '../assets/Vector.svg';
import instagram from '../assets/Vector (1).svg';
import linkedin from '../assets/Vector (2).svg';
import tiktok from '../assets/Subtract.svg';
import './Layout.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-container">
      <div className="left-section">
        <div className="contact-info">
          <p>Sales : 01730716021</p>
          <p>Email : sales@hometrustlivingltd.com</p>
        </div>
        <div className="copyright">
          <p>&copy;{currentYear}. Home Trust Living Ltd. All Rights Reserved</p>
        </div>
      </div>
      <div className="address-info">
        <div className="footer-social">
          <img src={facebook} alt="Facebook" />
          <img src={instagram} alt="Instagram" />
          <img src={linkedin} alt="LinkedIn" />
          <img src={tiktok} alt="TikTok" />
        </div>
        <p className="address-heading">Address</p>
        <p>House #11, Flat #A-4, Road #14/C,</p>
        <p>Sector #7, Uttara, Dhaka.</p>
      </div>
    </footer>
  );
};

export default Footer;
