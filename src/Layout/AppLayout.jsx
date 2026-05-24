import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import Footer from './Footer';
import Navbar from './Navbar';
import NavSideBar from './NavSideBar';

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <Navbar toggleNavSideBar={toggleNavSideBar} isNavOpen={isNavSideBarActive} />
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
