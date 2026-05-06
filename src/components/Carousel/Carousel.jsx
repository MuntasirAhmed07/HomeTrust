import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { stack, stackTwo } from '../../animation';
import HomeIcon from '../../assets/Frame.svg';
import LeftArrow from '../../assets/Line 1.svg';
import RightArrow from '../../assets/Line 2.svg';
import './Carousel.css';

const Carousel = ({ images, videos, interval = 5000 }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;
  const vidIndex = ((page % videos.length) + videos.length) % videos.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 500); // Delay for smooth appearance
  }, [imageIndex, vidIndex]);

  useEffect(() => {
    const autoplay = setInterval(() => {
      paginate(1); // Moves to the next slide automatically
    }, interval);

    return () => clearInterval(autoplay); // Cleanup interval on unmount
  }, [page, interval]);

  return (
    <div className="carousel-container">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={page}
          src={images[imageIndex].image}
          alt={images[imageIndex].title}
          custom={direction}
          variants={stack}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            position: 'absolute',
            width: '100vw', // Ensure full width
            height: '100vh', // Ensure full height
            objectFit: 'cover', // Prevent image from shrinking
            left: 0, // Align to the left edge
            top: 0,
          }}
        />
      </AnimatePresence>

      <div className="overlay"></div>
      <h4 className="featured-text">FEATURED PROJECTS</h4>
      <h2 className={`project-title ${showTitle ? 'show' : ''}`}>
        {images[imageIndex].title}
      </h2>

      <a href="https://shantaholdings.com/" className="view-project">
        <img src={HomeIcon} /> <span>View Project</span>
      </a>

      <div className="carousel-container-small">
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.img
            key={page}
            src={videos[vidIndex].video}
            alt={videos[vidIndex].title}
            custom={direction}
            variants={stackTwo}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button onClick={() => paginate(-1)} className="prev">
        <img src={LeftArrow} alt="Previous" />
      </button>
      <button onClick={() => paginate(1)} className="next">
        <img src={RightArrow} alt="Next" />
      </button>
    </div>
  );
};

export default Carousel;
