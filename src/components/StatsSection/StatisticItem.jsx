import React from 'react';
import CountUp from '../Countup/Countup';
import './StatsSection.css';

const StatisticItem = ({ value, tenth, label, sublabel }) => {
  return (
    <div className="statistic-item">
      <CountUp
        from={0}
        to={value}
        separator=","
        direction="up"
        duration={1}
        decimals={2}
        className="stat-value"
      />
      <span className="stat-value">{tenth}</span>
      <div className="stat-label">{label}</div>
      {sublabel && <div className="stat-sublabel">{sublabel}</div>}
    </div>
  );
};

export default React.memo(StatisticItem);
