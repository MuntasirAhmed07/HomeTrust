import React from 'react';
import StatisticItem from './StatisticItem';
import './StatsSection.css';

const StatisticsContainer = ({ statistics }) => {
  // Separate statistics by position
  const leftStats = statistics.filter((stat) =>
    stat.position.startsWith('left'),
  );
  const rightStats = statistics.filter((stat) =>
    stat.position.startsWith('right'),
  );

  return (
    <>
      {/* Left side stats */}
      <div className="stats-column stats-left">
        {leftStats.map((stat, index) => (
          <div key={`left-${index}`} className="stat-wrapper">
            <StatisticItem
              tenth={stat.tenth}
              value={stat.value}
              label={stat.label}
              sublabel={stat.sublabel}
            />
          </div>
        ))}
      </div>

      {/* Middle section is for the image, handled by parent component */}
      <div className="image-placeholder">{/* Building image goes here */}</div>

      {/* Right side stats */}
      <div className="stats-column stats-right">
        {rightStats.map((stat, index) => (
          <div key={`right-${index}`} className="stat-wrapper">
            <StatisticItem
              value={stat.value}
              tenth={stat.tenth}
              label={stat.label}
              sublabel={stat.sublabel}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default StatisticsContainer;
