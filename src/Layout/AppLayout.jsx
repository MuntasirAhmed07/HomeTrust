import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import NavSideBar from './NavSideBar';

const AppLayout = () => {
  const [isNavSideBarActive, setIsNavSideBarActive] = useState(false);

  const toggleNavSideBar = () => {
    setIsNavSideBarActive(!isNavSideBarActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isNavSideBarActive &&
        !event.target.closest('.sidebar') &&
        !event.target.closest('.menu')
      ) {
        toggleNavSideBar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavSideBarActive, toggleNavSideBar]);

  return (
    <>
      <Navbar toggleNavSideBar={toggleNavSideBar} />
      <AnimatePresence mode="wait">
        {isNavSideBarActive && (
          <NavSideBar toggleNavSideBar={toggleNavSideBar} />
        )}
      </AnimatePresence>
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
