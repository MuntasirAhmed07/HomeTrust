import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_email: 'muntasira17@gmail.com',
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }).catch(() => {
      setStatus('error');
    });
  };

  return (
    <motion.section
      className="cf-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      viewport={{ once: false }}>
      <div className="cf-left">
        <h2 className="cf-title">Get In Touch</h2>
        <form className="cf-form" onSubmit={handleSubmit}>
          <div className="cf-form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cf-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cf-form-group">
            <label>Message</label>
            <textarea
              rows={5}
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="cf-btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit'}
          </button>
          {status === 'success' && <p className="cf-feedback cf-success">Message sent! We'll be in touch soon.</p>}
          {status === 'error' && <p className="cf-feedback cf-error">Something went wrong. Please try again.</p>}
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
