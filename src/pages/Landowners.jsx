import { motion } from 'framer-motion';
import React from 'react';
import heroImg from '../assets/Hero Image1.png';
import PageHero from '../components/PageHero/PageHero';
import './Landowners.css';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: 'easeOut' },
  viewport: { once: false },
};

const Landowners = () => {
  return (
    <>
      <PageHero title={'Landowners'} image={heroImg} />

      {/* Message section */}
      <motion.section className="lo-message" {...fadeUp}>
        <h2 className="lo-message-title">A Message For Landowners</h2>
        <p className="lo-message-sub">
          Unlock the Potential of Your Land – Let&apos;s Partner for Success!
        </p>
        <p className="lo-message-body">
          At <strong>Hometrust Living Ltd</strong>, we specialise in transforming land into
          high-value developments, offering profitable partnerships with complete transparency.
        </p>
        <p className="lo-message-body">
          We help landowners maximise their property value. Whether they are considering selling,
          leasing, or developing land, we possess the expertise, resources, and market insights
          needed to achieve your goals.
        </p>
        <p className="lo-message-label">Here&apos;s how we can assist you:</p>
        <p className="lo-message-body">
          Market Analysis &nbsp;·&nbsp; Development Opportunities &nbsp;·&nbsp; Flexible Options
          &nbsp;·&nbsp; Stress-Free Process
        </p>
        <p className="lo-message-body">
          If you own land and are interested in developing it into a profitable project, let&apos;s
          discuss how we can create something exceptional together!
        </p>
      </motion.section>

      {/* Interested form */}
      <motion.section className="lo-form-section" {...fadeUp}>
        <h2 className="lo-form-title">Interested?</h2>
        <form className="lo-form" onSubmit={(e) => e.preventDefault()}>
          <div className="lo-form-grid">
            <div className="lo-form-group">
              <label>Name</label>
              <input type="text" />
            </div>
            <div className="lo-form-group">
              <label>Contact Number</label>
              <input type="tel" />
            </div>
            <div className="lo-form-group">
              <label>Location</label>
              <input type="text" />
            </div>
            <div className="lo-form-group">
              <label>Project Size</label>
              <input type="text" />
            </div>
            <div className="lo-form-group">
              <label>Email</label>
              <input type="email" />
            </div>
          </div>
          <button type="submit" className="lo-form-btn">
            <span className="lo-form-btn-icon">&#10148;</span> Submit
          </button>
        </form>
      </motion.section>
    </>
  );
};

export default Landowners;
