// import { motion, useInView } from 'framer-motion';
// import React, { useRef } from 'react';
// import './marqueetext.css';

// const MarqueeText = () => {
//   const inview = useRef(null);
//   const isInView = useInView(inview, { triggerOnce: true });

//   return (
//     <div className="marquee-outer-container" ref={inview}>
//       First copy of text
//       <div className="marq-text-container">
//         <motion.h3
//           className="marq-top-text-outline"
//           initial={{ x: '0%' }}
//           animate={isInView ? { x: '-100%' } : { x: '0%' }}
//           transition={{ duration: 20, ease: 'linear', repeat: Infinity }}>
//           PRIME SPOT • ADVISORY SERVICES • TIMELY HANDOVER
//         </motion.h3>
//         <motion.h3
//           className="marq-top-fill-text"
//           initial={{ x: '0%' }}
//           animate={isInView ? { x: '-100%' } : { x: '0%' }}
//           transition={{ duration: 20, ease: 'linear', repeat: Infinity }}>
//           PRIME SPOT • ADVISORY SERVICES • TIMELY HANDOVER
//         </motion.h3>
//       </div>

//       Second copy of text that follows the first
//       <div className="marq-text-container">
//         <motion.h3
//           className="marq-top-text-outline"
//           initial={{ x: '100%' }}
//           animate={isInView ? { x: '0%' } : { x: '100%' }}
//           transition={{ duration: 20, ease: 'linear', repeat: Infinity }}>
//           PRIME SPOT • ADVISORY SERVICES • TIMELY HANDOVER
//         </motion.h3>
//         <motion.h3
//           className="marq-top-fill-text"
//           initial={{ x: '100%' }}
//           animate={isInView ? { x: '0%' } : { x: '100%' }}
//           transition={{ duration: 20, ease: 'linear', repeat: Infinity }}>
//           PRIME SPOT • ADVISORY SERVICES • TIMELY HANDOVER
//         </motion.h3>
//       </div>
//     </div>
//   );
// };

// export default MarqueeText;

// import { motion, useInView } from 'framer-motion';
// import React, { useRef } from 'react';
// import './marqueetext.css';

// const MarqueeText = () => {
//   const inview = useRef(null);
//   const isInView = useInView(inview, { triggerOnce: true });
//   return (
//     <div className="marq-text-container" ref={inview}>
//       <motion.p
//         className="marq-top-text-outline"
//         initial={{ x: '100%' }}
//         animate={isInView ? { x: '-50%' } : { x: '0%' }}
//         transition={{ duration: 10, ease: 'linear', repeat: Infinity }}>
//         PRIME SPOT • ADVISORY SERVICES • TIMELY HANDOVER
//       </motion.p>
//       <motion.p
//         className="marq-top-fill-text"
//         initial={{ x: '100%' }}
//         animate={isInView ? { x: '-50%' } : { x: '0%' }}
//         transition={{ duration: 10, ease: 'linear', repeat: Infinity }}>
//         PRIME SPOT • ADVISORY SERVICES • TIMELY HANDOVER
//       </motion.p>
//     </div>
//   );
// };

// export default MarqueeText;

import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import './marqueetext.css';

const MarqueeText = () => {
  const outlineRef = useRef(null);
  const fillRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const contentWidth = outlineRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;

    // Calculate animation distance (content width + container width)
    const distance = contentWidth;

    // Set initial position
    gsap.set([outlineRef.current, fillRef.current], { x: containerWidth });

    // Animation
    const tl = gsap.timeline({ repeat: -1 });
    tl.to([outlineRef.current, fillRef.current], {
      x: -distance,
      duration: distance / 100, // Adjust 100 for speed
      ease: 'none',
    });

    return () => tl.kill();
  }, []);

  return (
    <>
      <div className="marq-text-container marq-desktop-only" ref={containerRef}>
        <div className="marquee-wrapper">
          <p ref={outlineRef} className="marq-top-text-outline">
            PRIME SPOT • ADVISORY SERVICES • TIMELY HANDOVER
          </p>
          <p ref={fillRef} className="marq-top-fill-text">
            PRIME SPOT • ADVISORY SERVICES • TIMELY HANDOVER
          </p>
        </div>
      </div>
    </>
  );
};

export default MarqueeText;
