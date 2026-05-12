import React, { useEffect, useRef, useState } from 'react';
import './MapFilter.css';

const MapFilter = ({ areas, statuses, types, filters, setFilters }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const barRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (key) =>
    setOpenDropdown((prev) => (prev === key ? null : key));

  const select = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setOpenDropdown(null);
  };

  const clear = (key, e) => {
    e.stopPropagation();
    setFilters((prev) => ({ ...prev, [key]: '' }));
  };

  const renderPill = (key, label, options) => {
    const active = filters[key];
    const isOpen = openDropdown === key;
    return (
      <div key={key} className={`filter-pill-wrapper ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <ul className="filter-dropdown">
            {options.map((opt) => (
              <li
                key={opt}
                className={`filter-option ${active === opt ? 'selected' : ''}`}
                onClick={() => select(key, opt)}>
                {opt}
              </li>
            ))}
          </ul>
        )}
        <button
          className={`filter-pill ${active ? 'active' : ''}`}
          onClick={() => toggle(key)}>
          <span>{active || label}</span>
          {active ? (
            <span className="filter-clear" onClick={(e) => clear(key, e)}>
              ×
            </span>
          ) : (
            <span className="filter-chevron">&#8964;</span>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="map-filter-bar" ref={barRef}>
      {renderPill('area', 'All Locations', areas)}
      {renderPill('status', 'Project Status', statuses)}
      {renderPill('type', 'Project Type', types)}
    </div>
  );
};

export default MapFilter;
