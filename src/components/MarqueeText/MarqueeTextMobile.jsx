import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import './marqueetext.css';

const MarqueeTextMobile = () => {
  const outlineRef = useRef(null);
  const fillRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const contentWidth = outlineRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;
    const distance = contentWidth;

    gsap.set([outlineRef.current, fillRef.current], { x: containerWidth });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to([outlineRef.current, fillRef.current], {
      x: -distance,
      duration: distance / 100,
      ease: 'none',
    });

    return () => tl.kill();
  }, []);

  return (
    <div className="marq-mobile-container marq-mobile-only" ref={containerRef}>
      <div className="marquee-wrapper">
        <p ref={outlineRef} className="marq-mobile-outline">
          PRIME SPOT • ADVISORY SERVICES • TIMELY HANDOVER
        </p>
        <p ref={fillRef} className="marq-mobile-fill">
          PRIME SPOT • ADVISORY SERVICES • TIMELY HANDOVER
        </p>
      </div>
    </div>
  );
};

export default MarqueeTextMobile;
