import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import building from '../assets/building.avif';
import heroImg from '../assets/Hero Image1.png';
import PageHero from '../components/PageHero/PageHero';
import './OurStory.css';

const values = [
  {
    title: 'Integrity',
    description:
      'We conduct our business with the highest standards of honesty and transparency, ensuring every commitment we make is one we keep.',
  },
  {
    title: 'Trust',
    description:
      'Trust is the foundation of every relationship we build — with our clients, partners, and the communities we serve.',
  },
  {
    title: 'Client-Centric Approach',
    description:
      'Our clients are at the heart of every decision we make. We listen, understand, and deliver solutions tailored to their unique needs.',
  },
  {
    title: 'Professionalism',
    description:
      'From design to delivery, we uphold the highest levels of professionalism in every interaction and every project we undertake.',
  },
  {
    title: 'Accountability',
    description:
      'We take full ownership of our work and stand behind every promise — our success is measured by the satisfaction of those we serve.',
  },
  {
    title: 'Excellence',
    description:
      'We are relentless in our pursuit of excellence, continuously raising the bar for quality, innovation, and craftsmanship.',
  },
  {
    title: 'Collaboration',
    description:
      'Great outcomes are built together. We work in close partnership with clients, landowners, and communities to create shared value.',
  },
];

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`os-faq-item ${open ? 'os-faq-item--open' : ''}`}>
      <button className="os-faq-question" onClick={() => setOpen((o) => !o)}>
        <span>{question}</span>
        <span className="os-faq-icon">{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="os-faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}>
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OurStory = () => {
  return (
    <>
      <PageHero title="Our Story" image={building} />

      {/* Foundation */}
      <motion.section
        className="os-foundation"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false }}>
        <div className="os-foundation-left">
          <h2>Foundation</h2>
          <img src={building} className="os-foundation-img" alt="Foundation" />
        </div>
        <div className="os-foundation-right">
          <h3 className="os-foundation-tagline">
            Deliver Exceptional Real Estate Solutions That Transform Dreams Into
            Addresses
          </h3>
          <div className="os-foundation-body">
            <p>
              Hometrust Living Ltd was founded in 2010 by [Name] with a vision
              to redefine real estate in Bangladesh. Based in Banani, Dhaka, the
              company aims to provide high-quality residential, commercial,
              luxury, and affordable housing solutions. With a strong commitment
              to integrity, innovation, and customer satisfaction, Hometrust
              Living Ltd has quickly established itself as a trusted name in the
              industry. 
            </p>
            <p>
              Over the years, the company successfully completed and handed over
              around 18 projects, each reflecting its commitment to excellence
              in architecture, customer service, and project management. Our
              expertise spans across various property types and scales,
              providing customers with a broad range of options tailored to
              their specific needs.
            </p>
            <p>
              Hometrust Interior and Design Solutions, was established in 2020.
              The company specializes in creative, functional, and modern
              interior designs for residential, commercial, and corporate
              spaces. 
            </p>
            <p>
              Hometrust Construction and Design Ltd. was established in 2023,
              specializes in high-quality construction, architectural design,
              and project management. The company ensures excellence in every
              project, building trust and shaping the future of real estate.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Who We Are */}
      <motion.section
        className="os-who"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false }}>
        <div className="os-who-left">
          <h2>Who We Are</h2>
          <p>
            At <strong>Hometrust Living Ltd</strong>, we are more than just a
            real estate company — we are visionaries, builders, and trusted
            partners in creating exceptional living and working spaces. Since our
            establishment in <strong>2010</strong>, we have been committed to
            excellence, innovation, and customer satisfaction, ensuring that
            every project reflects our passion for quality and integrity.
          </p>
        </div>
        <div className="os-who-right">
          <p>
            Our portfolio is more than just a collection of properties — it is a
            legacy of trust, excellence, and forward-thinking design. At{' '}
            <strong>Hometrust Living Ltd</strong>, we are dedicated to building
            a future where every project contributes to vibrant, sustainable
            communities and sets new benchmarks for quality in real estate.
            Discover how our portfolio is redefining modern living and paving the
            way for a brighter, more connected future.
          </p>
        </div>
      </motion.section>

      {/* Vision + Mission — staggered layout */}
      <section className="os-vm-grid">
        <motion.div
          className="os-vision"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: false }}>
          <h2>Vision</h2>
          <p>
            To deliver innovative real estate solutions, building trusted
            communities for the future.
          </p>
          <img src={building} className="os-vm-img" alt="Our Vision" />
        </motion.div>

        <motion.div
          className="os-mission"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: false }}>
          <h2>Mission</h2>
          <p>
            To be a trusted leader in the real estate sector contributing toward
            a progressive Bangladesh.
          </p>
          <img src={heroImg} className="os-vm-img" alt="Our Mission" />
        </motion.div>
      </section>

      {/* Values */}
      <motion.section
        className="os-values"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false }}>
        <h2>Values</h2>
        <div className="os-values-content">
          <div className="os-faq-list">
            {values.map((value) => (
              <FAQItem
                key={value.title}
                question={value.title}
                answer={value.description}
              />
            ))}
          </div>
          <div className="os-values-right">
            <img src={building} className="os-values-img" alt="Our Values" />
            <p className="os-values-desc">
              Hometrust Living Ltd is becoming a trusted leader in the real
              estate sector in Bangladesh, where every home and commercial space
              we create strongly reflects our character. Our core values define
              who we are, guide our decisions, and shape our vision for the
              future.
            </p>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default OurStory;
