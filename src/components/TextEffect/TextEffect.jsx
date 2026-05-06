import React, { useEffect } from 'react';
import './TextEffect.css';

const TextEffect = ({ text = 'Our Story' }) => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      new LocomotiveScroll();
    })();
  }, []);

  return (
    <div className="text-container">
      <h1 data-scroll data-scroll-speed="0.3" className="top-text-outline">
        {text}
      </h1>
      <h1 data-scroll data-scroll-speed="0.3" className="top-fill-text">
        {text}
      </h1>
    </div>
  );
};

export default TextEffect;
