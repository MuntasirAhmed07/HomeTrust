import { motion } from 'framer-motion';
import React from 'react';
import building from '../assets/building.avif';
import heroImg from '../assets/Hero Image1.png';
import rakib from '../assets/RAKIB-CASTLE.webp';
import PageHero from '../components/PageHero/PageHero';
import './OurTeam.css';

const directors = [
  {
    label: 'Chairman & Managing Director',
    name: 'Mohammed Masum',
    subtitle: 'Driving Growth & Excellence in Real Estate',
    bio: 'At Hometrust Living Ltd, our Managing Director, Mohammed Masum, plays a key role in strategic planning, business expansion, and operational excellence. With a strong background in real estate development and customer relations, the Managing Director ensures that the company delivers high-quality, sustainable, affordable and innovative real estate solutions.',
    image: building,
    reverse: false,
  },
  {
    label: 'Director',
    name: 'Rifat Hossain',
    subtitle: 'Expert Leadership for Real Estate Success',
    bio: "At Hometrust Living Ltd, our Director, Rifat Hossain brings extensive expertise and leadership to further the company's vision of transforming the real estate sector in Bangladesh. With a deep understanding of construction management, real estate finance, and market trends, the Director plays a crucial role in shaping the company's strategic direction, growth, and operational efficiency. By focusing on sustainability, innovation, and client satisfaction, the Director ensures that Hometrust Living Ltd consistently delivers exceptional real estate solutions for our clients and partners.",
    image: rakib,
    reverse: true,
  },
];

const members = [
  {
    title: 'Architects &\nEngineers',
    desc: 'The creative minds behind our innovative and sustainable designs.',
  },
  {
    title: 'Project Managers &\nConstruction Experts',
    desc: 'Ensuring high-quality developments are delivered on time.',
  },
  {
    title: 'Sales & Marketing\nProfessionals',
    desc: 'Helping clients find their dream homes and investments.',
  },
  {
    title: 'Legal & Finance\nExperts',
    desc: 'Managing property transactions with transparency and efficiency.',
  },
  {
    title: 'Customer Service\n& Support',
    desc: 'Providing seamless assistance from inquiry to ownership.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: 'easeOut' },
  viewport: { once: false },
};

const OurTeam = () => {
  return (
    <>
      <PageHero
        title={"The Team That Builds Trust\nThrough Excellence and Dedication"}
        image={heroImg}
      />

      {/* Board of Directors */}
      <motion.section className="ot-board" {...fadeUp}>
        <h2 className="ot-section-title">Board of Directors</h2>
        <div className="ot-directors">
          {directors.map((d) => (
            <motion.div
              key={d.name}
              className={`ot-director${d.reverse ? ' ot-director--reverse' : ''}`}
              {...fadeUp}>
              <div className="ot-director-text">
                <p className="ot-director-label">{d.label}</p>
                <h3 className="ot-director-name">{d.name}</h3>
                <p className="ot-director-subtitle">{d.subtitle}</p>
                <p className="ot-director-bio">{d.bio}</p>
              </div>
              <div className="ot-director-img-box">
                <img src={d.image} alt={d.name} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Members Include */}
      <motion.section className="ot-members" {...fadeUp}>
        <h2 className="ot-section-title">Our Members Include</h2>
        <div className="ot-members-grid">
          {members.slice(0, 3).map((m) => (
            <div key={m.title} className="ot-member-card">
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="ot-members-grid-bottom">
          {members.slice(3).map((m) => (
            <div key={m.title} className="ot-member-card">
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Full-width team image */}
      <div className="ot-team-img-wrap">
        <img src={building} alt="Our team at work" />
      </div>

      {/* About paragraphs */}
      <motion.section className="ot-about" {...fadeUp}>
        <p>
          The team at <strong>Hometrust Living Ltd</strong> is a passionate and
          skilled group of professionals specializing in architecture,
          engineering, project management, and customer service. Each member
          plays a vital role in ensuring that every development meets the
          highest standards. Committed to building trust, our team emphasizes
          integrity, transparency, and a customer-centric approach to create
          lasting value for our clients and communities.
        </p>
        <p>
          We are dedicated to creating exceptional living spaces with a shared
          vision of blending luxury and affordability. By combining our
          expertise, innovation, and integrity, we aim to redefine the real
          estate experience. Whether it&apos;s a luxury residence or an
          affordable home, we work tirelessly to turn dreams into reality and
          deliver projects that inspire, uplift, and provide enduring value.
        </p>
      </motion.section>
    </>
  );
};

export default OurTeam;
