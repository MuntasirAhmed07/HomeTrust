import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import { opacity } from '../animation';
import Logo from '../assets/logo';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import './Layout.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ toggleNavSideBar, isNavOpen }) => {
  const navbarRef = useRef(null); // Ref for navbar

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // GSAP Navbar Hide/Show Animation
      gsap.fromTo(
        navbarRef.current,
        { y: 0 },
        {
          y: '-100%',
          duration: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'max',
            scrub: true,
            onUpdate: (self) => {
              self.direction === -1
                ? gsap.to(navbarRef.current, { y: 0, duration: 0.3 })
                : gsap.to(navbarRef.current, { y: '-100%', duration: 0.3 });
            },
          },
        },
      );
    }, navbarRef);

    return () => ctx.revert(); // Cleanup animation when component unmounts
  }, []);

  return (
    <nav ref={navbarRef} className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <Logo />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <ThemeSwitch />
        {/* Menu Button */}
        <div
          onMouseDown={() => {
            toggleNavSideBar();
          }}
          className={`menu${isNavOpen ? ' menu-active' : ''}`}>
          <div className="menu-txt">
            <motion.p variants={opacity} animate="open">
              MENU
            </motion.p>
          </div>
          <div className="menu-btn">
            <span className="menu-icon"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
