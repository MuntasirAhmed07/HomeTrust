import { motion } from 'framer-motion';
import React from 'react';
import heroImg from '../assets/Hero Image1.png';
import ContactForm from '../components/ContactForm/ContactForm';
import MapSection from '../components/MapSection/MapSection';
import PageHero from '../components/PageHero/PageHero';
import './ContactUs.css';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: 'easeOut' },
  viewport: { once: false },
};

const ContactUs = () => {
  return (
    <>
      <PageHero title={'Contact Us'} image={heroImg} />

      {/* Why Choose Us */}
      <motion.section className="cu-why" {...fadeUp}>
        <h2 className="cu-why-title">Why Choose Us?</h2>
        <p className="cu-why-body">
          At <strong>Hometrust Living Ltd</strong>, affordable housing means more than lower
          prices — it means dignified living, smart design, and long-term value. Our affordable
          housing concept is built to serve middle-income families by combining quality
          construction, functional layouts, and cost efficiency without compromising safety or
          comfort.
        </p>
      </motion.section>

      <ContactForm />
      <MapSection />
    </>
  );
};

export default ContactUs;
