import { motion } from 'framer-motion';
import React from 'react';
import heroImg from '../assets/Hero Image1.png';
import asianPaints from '../assets/partners/1700215476698.png';
import bsrm from '../assets/partners/BSRM-Corporate-New-Logo-01.png';
import ksrm from '../assets/partners/KSRM.png';
import gph from '../assets/partners/Logo_of_GPH_ispat.png';
import ucb from '../assets/partners/Logo_of_United_Commercial_Bank.svg.png';
import rsrm from '../assets/partners/RSRM-1.png';
import bashundhara from '../assets/partners/bashundhara-cement-ltd-logo-png_seeklogo-515521.png';
import cityBank from '../assets/partners/city-bank-bangladesh-logo-A5D4E35B96-seeklogo.com.png';
import concord from '../assets/partners/concordlogo.png';
import crownCement from '../assets/partners/crown-cement-logo-F1B9AC7CCF-seeklogo.com.png';
import elitePaint from '../assets/partners/elite-paint-logo-830E6814F8-seeklogo.com.png';
import jamunaBank from '../assets/partners/jamuna-bank-logo-png_seeklogo-518429.png';
import berger from '../assets/partners/kindpng_3663948.png';
import partex from '../assets/partners/partex-logo.png';
import standardChartered from '../assets/partners/sc-lock-up-english-grey-rgb.png';
import Shahcement from '../assets/partners/shahcement.png';
import PageHero from '../components/PageHero/PageHero';
import './OurPartners.css';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: 'easeOut' },
  viewport: { once: false },
};

const partners = [
  { name: 'City Bank', logo: cityBank },
  { name: 'Jamuna Bank', logo: jamunaBank },
  { name: 'Standard Chartered', logo: standardChartered },
  { name: 'UCB', logo: ucb },
  { name: 'Bashundhara Cement', logo: bashundhara },
  { name: 'Crown Cement', logo: crownCement },
  { name: 'Shah Cement', logo: Shahcement },
  { name: 'Concord', logo: concord },
  { name: 'Berger', logo: berger },
  { name: 'Elite Paint', logo: elitePaint },
  { name: 'Asian Paints', logo: asianPaints },
  { name: 'Partex Star', logo: partex },
  { name: 'BSRM', logo: bsrm },
  { name: 'KSRM', logo: ksrm },
  { name: 'GPH Ispat', logo: gph },
  { name: 'RSRM', logo: rsrm },
];

const OurPartners = () => {
  return (
    <>
      <PageHero title={'Our Partners'} image={heroImg} />

      {/* Description */}
      <motion.section className="op-desc" {...fadeUp}>
        <p>
          Hometrust Living Ltd. collaborates with leading suppliers to ensure
          our projects meet the highest standards of quality, durability, and
          innovation.
        </p>
      </motion.section>

      {/* Partner logos */}
      <motion.section className="op-logos" {...fadeUp}>
        <div className="op-logos-grid">
          {partners.map((p) => (
            <div key={p.name} className="op-logo-cell">
              <img src={p.logo} alt={p.name} />
            </div>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default OurPartners;
