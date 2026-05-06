import { motion } from 'framer-motion';
import React, { useState } from 'react';
import building from '../assets/building.avif';
import designPhilosophy from '../assets/design-philosophy.svg';
import heroImg from '../assets/Hero Image1.png';
import rakib from '../assets/RAKIB-CASTLE.webp';
import ContactForm from '../components/ContactForm/ContactForm';
import MapSection from '../components/MapSection/MapSection';
import PageHero from '../components/PageHero/PageHero';
import './WhyHomeTrust.css';

const firstsProjects = [
  { id: 0, name: 'Hometrust\nBuilding Trust (Project)', image: building },
  { id: 1, name: 'Hometrust\nAhmed Castle (1st Project)', image: rakib },
  { id: 2, name: 'Hometrust\nPrime Residence (Project)', image: heroImg },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: 'easeOut' },
  viewport: { once: false },
};

const standOutItems = [
  { image: building, title: 'Prime Locations' },
  { image: building, title: 'Integrity and\nTransparency' },
  { image: building, title: 'Customer-Centric\nPhilosophy' },
  { image: building, title: 'Proven\nTrack Record' },
  { image: building, title: 'High-Quality Construction\n& Thoughtful Design' },
  { image: building, title: 'Affordable Housing\nwithout Compromise' },
  { image: building, title: 'Sustainable & Future-\nReady Communities' },
];

const philosophyDesignPoints = [
  'Efficiently planned to reduce wasted space',
  'Naturally ventilated and well-lit',
  'Comfortable for families, with practical room sizes',
  'Every square foot is carefully optimized to ensure maximum usability and affordability.',
];

const philosophyKeyFeatures = [
  'Prime Locations – Well-connected, thriving neighborhoods.',
  'Luxury & Affordable Options – Homes tailored to your lifestyle and budget.',
  'Modern Amenities – Smart home features, security, and community facilities.',
  'Flexible Payment Plans – Making homeownership easier than ever.',
  'Trusted & Reliable – Years of experience in delivering high-quality developments.',
  "Whether you're a first-time homebuyer, investor, or looking to upgrade, we have the perfect property for you!",
];

const WhyHomeTrust = () => {
  const [firstsIndex, setFirstsIndex] = useState(1);
  return (
    <>
      <PageHero title={'Why HomeTrust?'} image={heroImg} />

      {/* Why Choose HomeTrust */}
      <motion.section className="wht-choose" {...fadeUp}>
        <h2 className="wht-section-title">Why Choose Hometrust?</h2>
        <p className="wht-choose-desc">
          At Hometrust Living Ltd, affordable housing means more than lower
          prices — it means dignified living, smart design, and long-term value.
          Our affordable housing concept is built to serve middle-income
          families by combining quality construction, functional layouts, and
          cost efficiency without compromising safety or comfort.
        </p>

        <h3 className="wht-standout-title">Here&apos;s Why We Stand Out</h3>

        <div className="wht-standout-row wht-standout-row--3">
          {standOutItems.slice(0, 3).map((item) => (
            <div key={item.title} className="wht-standout-card">
              <img src={item.image} alt={item.title} />
              <div className="wht-standout-overlay">
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="wht-standout-row wht-standout-row--2">
          {standOutItems.slice(3, 5).map((item) => (
            <div key={item.title} className="wht-standout-card">
              <img src={item.image} alt={item.title} />
              <div className="wht-standout-overlay">
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="wht-standout-row wht-standout-row--2">
          {standOutItems.slice(5).map((item) => (
            <div key={item.title} className="wht-standout-card">
              <img src={item.image} alt={item.title} />
              <div className="wht-standout-overlay">
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Our Design Philosophy */}
      <motion.section className="wht-philosophy" {...fadeUp}>
        <div className="wht-philosophy-left">
          <h2 className="wht-philosophy-title">Our Design Philosophy</h2>
          <p className="wht-philosophy-sub">
            Thoughtful Spaces For Everyday Life
          </p>

          <p className="wht-philosophy-label">We design homes that are:</p>
          <ol className="wht-philosophy-ol">
            {philosophyDesignPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ol>

          <p className="wht-philosophy-label">Key Features :</p>
          <ul className="wht-philosophy-ul">
            {philosophyKeyFeatures.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="wht-philosophy-right">
          <img src={designPhilosophy} alt="Design Philosophy" />
        </div>
      </motion.section>

      {/* Firsts of HomeTrust */}
      <motion.section className="wht-firsts" {...fadeUp}>
        <h2 className="wht-firsts-title">Firsts of Hometrust</h2>
        <p className="wht-firsts-sub">{firstsProjects[firstsIndex].name}</p>

        <div className="wht-firsts-carousel">
          {firstsProjects.map((p, i) => (
            <div
              key={p.id}
              className={`wht-firsts-slide ${i === firstsIndex ? 'wht-firsts-slide--active' : 'wht-firsts-slide--side'}`}>
              <img src={p.image} alt={p.name} />
            </div>
          ))}
        </div>

        <div className="wht-firsts-dots">
          {firstsProjects.map((p, i) => (
            <button
              key={i}
              className={`wht-firsts-dot ${i === firstsIndex ? 'wht-firsts-dot--active' : ''}`}
              onClick={() => setFirstsIndex(i)}
            />
          ))}
        </div>
      </motion.section>

      <ContactForm />

      {/* Map */}
      <MapSection />
    </>
  );
};

export default WhyHomeTrust;
