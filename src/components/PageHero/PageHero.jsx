import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import TextEffect from '../TextEffect/TextEffect';
import './PageHero.css';

const PageHero = ({ title, image, alt }) => {
  const mediaRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: '+=500',
        scrub: true,
      },
    });
    tl.from(mediaRef.current, { clipPath: 'inset(5%)' });
    return () => tl.kill();
  }, []);

  return (
    <section className="page-hero">
      <TextEffect text={title} />
      <div ref={mediaRef} className="page-hero-media">
        <img src={image} className="page-hero-img" alt={alt || title} />
        <div className="page-hero-overlay" />
      </div>
    </section>
  );
};

export default PageHero;
