import React, { useMemo, useState } from 'react';
import projects from '../../Data/projects';
import Map from '../Map';
import MapFilter from '../MapFilter/MapFilter';
import Sidebar from '../Sidebar';

const MapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [filters, setFilters] = useState({ area: '', status: '', type: '' });

  const areas = useMemo(() => [...new Set(projects.map((l) => l.location))].filter(Boolean).sort(), []);
  const statuses = useMemo(() => [...new Set(projects.map((l) => l.status))].filter(Boolean).sort(), []);
  const types = useMemo(() => [...new Set(projects.map((l) => l.type))].filter(Boolean).sort(), []);

  const filteredLocations = projects.filter((loc) => {
    if (filters.area && loc.location !== filters.area) return false;
    if (filters.status && loc.status !== filters.status) return false;
    if (filters.type && loc.type !== filters.type) return false;
    return true;
  });

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
        <div className="map-canvas-wrapper">
          <Map
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            showPanel={showPanel}
            setShowPanel={setShowPanel}
          />
          <MapFilter
            areas={areas}
            statuses={statuses}
            types={types}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </section>
    </>
  );
};

export default MapSection;
