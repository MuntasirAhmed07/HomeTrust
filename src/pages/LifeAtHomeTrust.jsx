import { motion } from 'framer-motion';
import React from 'react';
import building from '../assets/building.avif';
import heroImg from '../assets/Hero Image1.png';
import rakib from '../assets/RAKIB-CASTLE.webp';
import PageHero from '../components/PageHero/PageHero';
import './LifeAtHomeTrust.css';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: 'easeOut' },
  viewport: { once: false },
};

const events = [
  { image: rakib, title: 'Annual Tour' },
  { image: building, title: 'Project Opening Ceremony' },
];

const LifeAtHomeTrust = () => {
  return (
    <>
      <PageHero title={'Life at\nHome Trust'} image={heroImg} />

      {/* Grow section */}
      <motion.section className="lh-grow" {...fadeUp}>
        <h2 className="lh-grow-title">
          Grow, Thrive, And{'\n'}Build The Future Together!
        </h2>
        <p className="lh-grow-desc">
          At Hometrust Living Ltd, being an employee means being a part of a dynamic, innovative,
          and supportive team where your growth and well-being are our top priority. We foster an
          environment where creativity, collaboration, and dedication are celebrated, and where
          employees feel empowered to contribute to the company's success.
        </p>
      </motion.section>

      {/* Event cards */}
      <motion.section className="lh-events" {...fadeUp}>
        {events.map((e) => (
          <div key={e.title} className="lh-event-card">
            <img src={e.image} alt={e.title} />
            <div className="lh-event-overlay">
              <h3>{e.title}</h3>
            </div>
          </div>
        ))}
      </motion.section>
    </>
  );
};

export default LifeAtHomeTrust;
