import React, { useMemo, useState } from 'react';
import heroImg from '../assets/Hero Image1.png';
import FilterBar from '../components/FilterBar/FilterBar';
import PageHero from '../components/PageHero/PageHero';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import projects from '../Data/projects';
import './ProjectsListing.css';

const ProjectsListing = () => {
  const [filters, setFilters] = useState({ location: '', status: '', type: '', search: '' });

  const filteredProjects = useMemo(() => {
    const q = filters.search.toLowerCase();
    return projects.filter((p) => {
      if (filters.location && p.location !== filters.location) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (q && !p.fullName.toLowerCase().includes(q) && !p.shortAddress.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="projects-page-wrapper">
      <PageHero title={'Premium Properties\nin Prime Locations'} image={heroImg} />

      <div className="projects-filter-wrap">
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      <div className="projects-body">
        {filteredProjects.length === 0 ? (
          <p className="projects-empty">No projects match your filters.</p>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsListing;
