import { motion } from 'framer-motion';
import React from 'react';
import building from '../assets/building.avif';
import heroImg from '../assets/Hero Image1.png';
import rakib from '../assets/RAKIB-CASTLE.webp';
import LetsConnect from '../components/LetsConnect/LetsConnect';
import PageHero from '../components/PageHero/PageHero';
import './OurBusiness.css';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: 'easeOut' },
  viewport: { once: false },
};

const businesses = [
  {
    image: rakib,
    name: 'Hometrust Construction\nAnd Design LTD.',
  },
  {
    image: building,
    name: 'Hometrust Interior\nAnd Design Solution',
  },
  {
    image: heroImg,
    name: 'Hometrust Interior\nAnd Design Solution',
  },
];

const OurBusiness = () => {
  return (
    <>
      <PageHero title={'Our Businesses'} image={heroImg} />

      {/* Description */}
      <motion.section className="ob-desc" {...fadeUp}>
        <p>
          We specialise in developing and selling residential properties,
          including luxury apartments and affordable homes. Our diverse
          portfolio caters to both first-time buyers and individuals seeking
          high-end living spaces. We take pride in offering exceptional value,
          where elegant design meets affordable pricing.
        </p>
      </motion.section>

      {/* Business Cards */}
      <motion.section className="ob-cards" {...fadeUp}>
        {businesses.map((b) => (
          <div key={b.name} className="ob-card">
            <img src={b.image} alt={b.name} />
            <div className="ob-card-overlay">
              <h3>{b.name}</h3>
            </div>
          </div>
        ))}
      </motion.section>
    </>
  );
};

export default OurBusiness;
