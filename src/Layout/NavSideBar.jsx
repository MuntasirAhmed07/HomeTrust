import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { menuSlide, menuSlideTop } from '../animation';

const NavSideBar = ({ toggleNavSideBar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <motion.div
      variants={isMobile ? menuSlideTop : menuSlide}
      animate="enter"
      exit="exit"
      initial="initial"
      className="sidebar">
      <div className="body">
        {/* <div className="header">
          <p>Search bar</p>
        </div> */}
        <motion.div className="nav">
          <NavLink to="/" onClick={toggleNavSideBar}>Home</NavLink>
          <NavLink to="/ourstory" onClick={toggleNavSideBar}>Our Story</NavLink>
          <NavLink to="/ourteam" onClick={toggleNavSideBar}>Our Team</NavLink>
          <NavLink to="/ourpartners" onClick={toggleNavSideBar}>Our Partners</NavLink>
          <NavLink to="/ourbusiness" onClick={toggleNavSideBar}>Our Business</NavLink>
          <NavLink to="/whyhometrust" onClick={toggleNavSideBar}>Why HomeTrust</NavLink>
          <NavLink to="/lifeathometrust" onClick={toggleNavSideBar}>Life At HomeTrust</NavLink>
          <NavLink to="/landowners" onClick={toggleNavSideBar}>Landowners</NavLink>
          <NavLink to="/projects" onClick={toggleNavSideBar}>Projects</NavLink>
          <NavLink to="/contactus" onClick={toggleNavSideBar}>Contact Us</NavLink>
        </motion.div>
        <div className="nav-footer">
          <div className="social-icons">
            <a>
              <i class="fa-brands fa-instagram"></i>
            </a>
          </div>
          <div className="social-icons">
            <a href="https://www.facebook.com/hometrustlivingltd/" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
          </div>
          <div className="social-icons">
            <a>
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <div className="social-icons">
            <a>
              <i class="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>
        <div
          onMouseDown={() => {
            toggleNavSideBar();
          }}
          className="close-button">
          <div className="menu-txt">
            <motion.p animate="open">CLOSE</motion.p>
          </div>
          <div className="menu-btn">
            <span className={`menu-icon menu-icon-active`}></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavSideBar;
