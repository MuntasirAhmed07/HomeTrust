import { motion } from 'framer-motion';
import React from 'react';
// import { opacity } from '../animation'
import '../App.css';

const Sidebar = ({ selectedLocation, showPanel, setShowPanel }) => {
  return (
    <div>
      <div className={`info-panel ${showPanel ? 'show' : ''}`}>
        <button className="close-btn" onClick={() => setShowPanel(!showPanel)}>
          ×
        </button>
        {selectedLocation ? (
          <div>
            <h3>{selectedLocation.name}</h3>
            <p>Price: {selectedLocation.price}</p>
            <p>Status: {selectedLocation.status}</p>
            <p>{selectedLocation.description}</p>
          </div>
        ) : (
          <p>No location selected</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
