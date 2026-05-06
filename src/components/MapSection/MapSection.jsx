import React, { useState } from 'react';
import location from '../../data/locations';
import Map from '../Map';
import Sidebar from '../Sidebar';

const MapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <div
        className={`background ${showPanel ? 'open' : ''}`}
        onClick={() => setShowPanel(false)}
      />
      <Sidebar
        selectedLocation={selectedLocation}
        showPanel={showPanel}
        setShowPanel={setShowPanel}
      />
      <section className="map-container">
        <h3>Projects</h3>
        <div className="map-bg" />
        <Map
          locations={location}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          showPanel={showPanel}
          setShowPanel={setShowPanel}
        />
      </section>
    </>
  );
};

export default MapSection;
