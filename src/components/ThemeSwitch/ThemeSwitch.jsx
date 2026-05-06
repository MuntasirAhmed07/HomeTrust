import React, { useEffect, useState } from 'react';
import './ThemeSwitch.css';

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Set initial theme based on local storage or default to light mode
    const storedTheme = localStorage.getItem('theme');
    const initialDarkMode = storedTheme === 'dark';
    setIsDarkMode(initialDarkMode);
    applyTheme(initialDarkMode);
  }, []);

  const toggleTheme = (e) => {
    const darkMode = e.target.checked;
    setIsDarkMode(darkMode);
    applyTheme(darkMode);
  };

  const applyTheme = (darkMode) => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.querySelector('body').setAttribute('data-theme', 'dark');
    } else {
      document.querySelector('body').setAttribute('data-theme', 'light');
    }
  };

  return (
    <div className={`theme-switch ${isDarkMode ? 'dark' : 'light'}`}>
      <span>{isDarkMode ? 'DARK' : 'LIGHT'}</span>
      <label className="toggle-switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <span className="toggle-thumb"></span>
      </label>
    </div>
  );
};

export default ThemeSwitch;
