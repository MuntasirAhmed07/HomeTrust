import { motion } from 'framer-motion';
import React from 'react';
import './ContactForm.css';

const ContactForm = () => {
  return (
    <motion.section
      className="cf-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      viewport={{ once: false }}>
      <div className="cf-left">
        <h2 className="cf-title">Get In Touch</h2>
        <form className="cf-form" onSubmit={(e) => e.preventDefault()}>
          <div className="cf-form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>
          <div className="cf-form-group">
            <label>Email</label>
            <input type="email" placeholder="Your email" />
          </div>
          <div className="cf-form-group">
            <label>Message</label>
            <textarea rows={5} placeholder="Your message" />
          </div>
          <button type="submit" className="cf-btn">Submit</button>
        </form>
      </div>
      <div className="cf-right">
        <div className="cf-info">
          <p className="cf-label">Sales:</p>
          <p className="cf-value">01730716021</p>
        </div>
        <div className="cf-info">
          <p className="cf-label">Email:</p>
          <p className="cf-value">sales@hometrustlivingltd.com</p>
        </div>
        <div className="cf-info">
          <p className="cf-label">Visit us:</p>
          <p className="cf-value">House #11, Flat #A-4, Road #14/C, Sector #7, Uttara, Dhaka.</p>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;
