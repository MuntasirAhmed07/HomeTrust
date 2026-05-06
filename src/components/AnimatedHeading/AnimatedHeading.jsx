import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './AnimatedHeading.css';

const AnimatedHeading = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Animate letter spacing from wide to normal
  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 1],
    ['0.15em', '0.02em'],
  );

  const getRandomOpacity = () => [0, 0.2, 0.5][Math.floor(Math.random() * 3)];

  const lines = [
    'Committed To Building Trust',
    'Through Excellence in Real Estate',
  ];

  return (
    <motion.div ref={ref} className="heading-container">
      {lines.map((line, lineIndex) => (
        <motion.div
          key={lineIndex}
          className="line"
          style={{ letterSpacing }} // Apply here
        >
          {line.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="char"
              initial={{ opacity: getRandomOpacity() }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: '-20% 0px', once: true }}
              transition={{ opacity: { duration: 0.5 } }}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedHeading;
