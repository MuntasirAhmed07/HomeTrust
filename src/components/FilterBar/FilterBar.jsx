import React, { useMemo, useState, useRef, useEffect } from 'react';
import projects from '../../Data/projects';
import './FilterBar.css';

const FilterBar = ({ filters, onChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const barRef = useRef(null);

  const locations = useMemo(() => [...new Set(projects.map((p) => p.location))].filter(Boolean).sort(), []);
  const statuses  = useMemo(() => [...new Set(projects.map((p) => p.status))].filter(Boolean).sort(), []);
  const types     = useMemo(() => [...new Set(projects.map((p) => p.type))].filter(Boolean).sort(), []);

  const set = (key, value) => onChange({ ...filters, [key]: value });

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const renderDropdown = (key, placeholder, options) => {
    const isOpen = openDropdown === key;
    const selected = filters[key];

    return (
      <div
        key={key}
        className={`filter-item${selected ? ' active' : ''}${isOpen ? ' is-open' : ''}`}
      >
        <button
          type="button"
          className="filter-trigger"
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(isOpen ? null : key);
          }}
        >
          <span className="filter-trigger-label">{selected || placeholder}</span>
          {!selected && (
            <span className={`filter-trigger-chevron${isOpen ? ' up' : ''}`}>&#8964;</span>
          )}
        </button>

        {selected && (
          <button
            type="button"
            className="filter-clear-btn"
            onClick={(e) => {
              e.stopPropagation();
              set(key, '');
            }}
            aria-label={`Clear ${placeholder}`}
          >
            ×
          </button>
        )}

        {isOpen && (
          <div className="filter-dropdown-panel">
            <div className="filter-dropdown-list">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className="filter-dropdown-item"
                  onClick={() => {
                    set(key, opt);
                    setOpenDropdown(null);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="filter-bar" ref={barRef}>
      {renderDropdown('location', 'All Locations', locations)}
      {renderDropdown('status',   'Project Status', statuses)}
      {renderDropdown('type',     'Project Type',   types)}

      <div className="filter-item filter-search-item">
        <span className="filter-search-icon">&#9906;</span>
        <input
          className="filter-search"
          type="text"
          placeholder="Search Projects"
          value={filters.search}
          onChange={(e) => set('search', e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterBar;
