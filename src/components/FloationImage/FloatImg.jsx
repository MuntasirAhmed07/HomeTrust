import React from 'react';
import './FloatImage.css';

const FloatImg = ({ imageUrl, altText }) => {
  return (
    <div className="float-img" data-scroll data-scroll-speed="0.2">
      <div className="overlapeImage mobileNone">
        <img className="wg-img" src={imageUrl} alt={altText} />
      </div>
    </div>
  );
};

export default FloatImg;
