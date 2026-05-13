import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import './InterestedForm.css';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: 'easeOut' },
  viewport: { once: false },
};

const InterestedForm = () => {
  const [form, setForm] = useState({
    name: '',
    contactNumber: '',
    location: '',
    projectSize: '',
    email: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_INTERESTED_TEMPLATE_ID,
      {
        from_name: form.name,
        contact_number: form.contactNumber,
        location: form.location,
        project_size: form.projectSize,
        from_email: form.email,
        to_email: 'muntasira17@gmail.com',
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setStatus('success');
      setForm({ name: '', contactNumber: '', location: '', projectSize: '', email: '' });
    }).catch(() => {
      setStatus('error');
    });
  };

  return (
    <motion.section className="lo-form-section" {...fadeUp}>
      <h2 className="lo-form-title">Interested?</h2>
      <form className="lo-form" onSubmit={handleSubmit}>
        <div className="lo-form-grid">
          <div className="lo-form-group">
            <label>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="lo-form-group">
            <label>Contact Number</label>
            <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} required />
          </div>
          <div className="lo-form-group">
            <label>Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} required />
          </div>
          <div className="lo-form-group">
            <label>Project Size</label>
            <input type="text" name="projectSize" value={form.projectSize} onChange={handleChange} required />
          </div>
          <div className="lo-form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="lo-form-btn" disabled={status === 'sending'}>
          <span className="lo-form-btn-icon">&#10148;</span>
          {status === 'sending' ? ' Sending…' : ' Submit'}
        </button>
        {status === 'success' && <p className="lo-feedback lo-success">Thank you! We'll reach out to you shortly.</p>}
        {status === 'error' && <p className="lo-feedback lo-error">Something went wrong. Please try again.</p>}
      </form>
    </motion.section>
  );
};

export default InterestedForm;
