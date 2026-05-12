import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel';
import Gallery from '../components/Gallery/Gallery';
import InterestedForm from '../components/InterestedForm/InterestedForm';
import Map from '../components/Map';
import MapFilter from '../components/MapFilter/MapFilter';
import Sidebar from '../components/Sidebar';
import { realEstate, videos } from '../Data/data';
import projects from '../Data/projects';
import './ProjectDetail.css';

const DETAIL_LABELS = [
  ['architect', 'ARCHITECT:'],
  ['land', 'LAND:'],
  ['stories', 'NUMBER OF STORY:'],
  ['flats', 'NUMBER OF FLATS:'],
  ['basements', 'NUMBER OF BASEMENTS:'],
  ['carParking', 'NUMBER OF CAR PARKING:'],
  ['orientation', 'ORIENTED OF LAND:'],
  ['frontRoadWidth', 'FRONT ROAD WIDTH:'],
  ['apartmentSize', 'SIZE OF APARTMENT:'],
];

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='700'%3E%3Crect width='600' height='700' fill='%23d0cec9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23888'%3ENo Image%3C/text%3E%3C/svg%3E";

const ProjectDetail = () => {
  const { id } = useParams();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPanel, setShowPanel] = useState(false);

  const [filters, setFilters] = useState({ area: '', status: '', type: '' });

  const project = projects.find((p) => p.id === id) ?? null;
  const exploreProjects = projects.filter((p) => p.id !== id).slice(0, 3);

  const areas = useMemo(
    () => [...new Set(projects.map((p) => p.location))].sort(),
    [],
  );
  const statuses = useMemo(
    () => [...new Set(projects.map((p) => p.status))].sort(),
    [],
  );
  const types = useMemo(
    () => [...new Set(projects.map((p) => p.type))].sort(),
    [],
  );

  const filteredProjects = useMemo(
    () =>
      projects.filter((p) => {
        if (filters.area && p.location !== filters.area) return false;
        if (filters.status && p.status !== filters.status) return false;
        if (filters.type && p.type !== filters.type) return false;
        return true;
      }),
    [filters],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowPanel(false);
    setSelectedLocation(null);
  }, [id]);

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project not found</h2>
        <p>The project you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/projects" className="project-back-link">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* 1. Hero */}
      <section className="project-detail-hero">
        <div className="project-detail-hero-left">
          <h1 className="project-detail-name">{project.name}</h1>
        </div>
        <div className="project-detail-hero-right">
          <img
            src={project.mainImage}
            alt={project.fullName}
            className="project-detail-main-img"
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER;
            }}
          />
        </div>
      </section>

      {/* 2. At A Glance */}
      <section className="project-at-a-glance">
        <div className="project-glance-grid">
          <div className="project-glance-left">
            <h2>At A Glance</h2>
            <p className="project-status-badge">
              STATUS: {project.status.toUpperCase()}
            </p>
            <p className="project-glance-label">ADDRESS</p>
            <p className="project-glance-value">{project.fullAddress}</p>
          </div>
          <div className="project-glance-details">
            {DETAIL_LABELS.map(([key, label]) => (
              <div key={key} className="project-glance-item">
                <span className="project-glance-item-label">{label}</span>
                <span className="project-glance-item-value">
                  {project.details[key] || '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Gallery */}
      <section className="project-gallery-section">
        <h2>Gallery</h2>
        {/* <Gallery images={project.gallery} /> */}
      </section>
      <Carousel images={realEstate} videos={videos} />

      {/* 4. Map */}
      <div
        className={`background ${showPanel ? 'open' : ''}`}
        onClick={() => setShowPanel(false)}
      />
      <Sidebar
        selectedLocation={selectedLocation}
        showPanel={showPanel}
        setShowPanel={setShowPanel}
      />
      <section className="project-map-section">
        <div className="map-canvas-wrapper">
          <Map
            locations={filteredProjects}
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

      {/* 5. Interested? */}
      <InterestedForm />

      {/* 6. Explore More */}
      {exploreProjects.length > 0 && (
        <section className="project-explore-more">
          <h2>Explore More Projects</h2>
          <div className="pem-grid">
            {exploreProjects.map((p) => (
              <Link key={p.id} to={`/projects/${p.id}`} className="pem-card">
                <div className="pem-img-wrap">
                  <img
                    src={p.mainImage}
                    alt={p.fullName}
                    className="pem-img"
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                  />
                  <div className="pem-overlay">
                    <p className="pem-name">{p.name}</p>
                    <p className="pem-addr">{p.shortAddress}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;
