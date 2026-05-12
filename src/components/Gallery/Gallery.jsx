import React, { useState } from 'react';
import './Gallery.css';

const Gallery = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="gallery-empty">No images available</div>;
  }

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="gallery-carousel">
      <img
        src={images[index]}
        alt={`Gallery image ${index + 1}`}
        className="gallery-image"
        onError={(e) => {
          e.currentTarget.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%23d0cec9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23888'%3ENo Image%3C/text%3E%3C/svg%3E";
        }}
      />
      {images.length > 1 && (
        <>
          <button className="gallery-arrow prev" onClick={prev} type="button">
            &#8249;
          </button>
          <button className="gallery-arrow next" onClick={next} type="button">
            &#8250;
          </button>
        </>
      )}
    </div>
  );
};

export default Gallery;
