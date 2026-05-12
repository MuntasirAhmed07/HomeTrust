import { motion } from 'framer-motion';
import React from 'react';
import heroImg from '../assets/Hero Image1.png';
import InterestedForm from '../components/InterestedForm/InterestedForm';
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

      <InterestedForm />
    </>
  );
};

export default Landowners;
