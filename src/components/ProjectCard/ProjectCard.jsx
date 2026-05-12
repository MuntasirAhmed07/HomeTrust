import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect width='400' height='500' fill='%23d0cec9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23888'%3ENo Image%3C/text%3E%3C/svg%3E";

const ProjectCard = ({ project, variant = 'default' }) => {
  if (variant === 'overlay') {
    return (
      <Link to={`/projects/${project.id}`} className="project-card overlay">
        <div className="project-card-image-wrap">
          <img
            src={project.mainImage}
            alt={project.fullName}
            className="project-card-image"
            onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
          />
          <div className="project-card-overlay">
            <p className="project-card-title">{project.name}</p>
            <p className="project-card-address">{project.shortAddress}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <div className="project-card-image-wrap">
        <img
          src={project.mainImage}
          alt={project.fullName}
          className="project-card-image"
          onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
        />
      </div>
      <div className="project-card-info">
        <p className="project-card-title">{project.fullName}</p>
        <p className="project-card-address">{project.shortAddress}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
