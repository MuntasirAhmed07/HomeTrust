import React, { useEffect, useState } from 'react';
import './StatsSection.css';

const BuildingImage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // You would replace this with your actual building image path
  const imageSrc = '/images/RAKIB-CASTLE.webp';

  return (
    <div className="building-container">
      <div className={`building-image-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <img
          src={imageSrc}
          alt="Modern residential building with green plants"
          className="building-image"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      {!isLoaded && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default React.memo(BuildingImage);
