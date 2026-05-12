import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='240'%3E%3Crect width='420' height='240' fill='%23d0cec9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23888'%3ENo Image%3C/text%3E%3C/svg%3E";

const DETAIL_ROWS = [
  ['Architect', 'architect'],
  ['Land Area', 'land'],
  ['Land Orientation', 'orientation'],
  ['Number of Apartments', 'flats'],
];

const Sidebar = ({ selectedLocation, showPanel, setShowPanel }) => {
  return (
    <div className={`info-panel ${showPanel ? 'show' : ''}`}>
      {selectedLocation ? (
        <>
          <div className="ip-img-wrap">
            <img
              src={selectedLocation.mainImage}
              alt={selectedLocation.name}
              className="ip-img"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
            />
            <button className="ip-close" onClick={() => setShowPanel(false)}>×</button>
          </div>

          <div className="ip-body">
            <h2 className="ip-name">{selectedLocation.name}</h2>
            <p className="ip-address">{selectedLocation.shortAddress}</p>

            <div className="ip-details">
              <h3 className="ip-details-heading">Project Details</h3>
              {DETAIL_ROWS.filter(([, key]) => selectedLocation.details?.[key]).map(([label, key]) => (
                <p key={key} className="ip-detail-row">
                  <span className="ip-detail-label">{label}: </span>
                  {selectedLocation.details[key]}
                </p>
              ))}
            </div>

            <Link
              to={`/projects/${selectedLocation.id}`}
              className="ip-see-details"
              onClick={() => setShowPanel(false)}
            >
              See Details
            </Link>
          </div>
        </>
      ) : (
        <div className="ip-empty">
          <button className="ip-close ip-close--bare" onClick={() => setShowPanel(false)}>×</button>
          <p>Select a project on the map</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
