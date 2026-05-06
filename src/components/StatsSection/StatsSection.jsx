import React from 'react';
import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';
import BuildingImage from './BuildingImage';
import StatisticsContainer from './StatisticsContainer';
import './StatsSection.css';

const StatsSection = () => {
  const statistics = [
    {
      value: '0.37',
      tenth: 'M+',
      label: 'Total Area Built',
      sublabel: '(Million sq.ft.)',
      position: 'left-top',
    },
    {
      value: '15',
      label: 'Years Since',
      sublabel: 'Inception',
      position: 'left-middle',
    },
    {
      value: '32',
      label: 'Number of',
      sublabel: 'Project',
      position: 'left-bottom',
    },
    {
      value: '18',
      label: 'Number of',
      sublabel: 'Completed Project',
      position: 'right-top',
    },
    {
      value: '400+',
      label: 'Happy Clients',
      sublabel: '',
      position: 'right-middle',
    },
    {
      value: '0.21',
      tenth: 'M+',
      label: 'Total Area in',
      sublabel: 'Pipeline',
      position: 'right-bottom',
    },
  ];

  return (
    <section className="hero-section">
      <div className="container">
        <AnimatedHeading />
        <div className="hero-content">
          <StatisticsContainer statistics={statistics} />
          <BuildingImage />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
