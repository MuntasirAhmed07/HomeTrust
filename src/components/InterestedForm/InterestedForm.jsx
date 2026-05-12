import { motion } from 'framer-motion';
import React from 'react';
import './InterestedForm.css';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: 'easeOut' },
  viewport: { once: false },
};

const InterestedForm = () => {
  return (
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
  );
};

export default InterestedForm;
