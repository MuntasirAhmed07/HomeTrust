import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import '../App.css';
import { realEstate, videos } from '../Data/data';
import building from '../assets/Hero Image1.png';
import AnimatedHeading from '../components/AnimatedHeading/AnimatedHeading';
import Carousel from '../components/Carousel/Carousel';
import CountUp from '../components/Countup/Countup';
import FloatImg from '../components/FloationImage/FloatImg';
import LetsConnect from '../components/LetsConnect/LetsConnect';
import MapSection from '../components/MapSection/MapSection';
import MarqueeText from '../components/MarqueeText/MarqueeText';
import MarqueeTextMobile from '../components/MarqueeText/MarqueeTextMobile';
import StatsSection from '../components/StatsSection/StatsSection';
import TextEffect from '../components/TextEffect/TextEffect';

const Home = () => {
  const heroImg = useRef(null);
  const videoContainerRef = useRef(null);
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  // useLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   const ctx = gsap.context(() => {
  //     // Scale animation
  //     gsap.to(videoContainerRef.current, {
  //       scale: 1.2, // Target scale value
  //       scrollTrigger: {
  //         trigger: videoContainerRef.current,
  //         start: 'top 80%', // Customizable start point
  //         end: 'center 20%', // Customizable end point
  //         scrub: 1, // Smooth scrubbing (seconds to catch up)
  //         markers: true, // Visual debug markers (remove in production)
  //       },
  //     });
  //   });

  //   return () => ctx.revert(); // Cleanup
  // }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: '+=500',
        scrub: true,
      },
    });
    timeline.from(heroImg.current, { clipPath: 'inset(5%)' });
  }, []);
  const [isActive, setIsActive] = useState(false);
  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ['50px 80%', '70% 60px'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]); // Scale from 1 to 1.2
  return (
    <>
      {/* <TextEffect />
      <div className="hero-section text-effect-container">
        <div className="page-banner-cover">
          <img src={building} alt="building" />
        </div>
      </div> */}
      <div className="hero-txt">
        <h1 className="top-txt">building</h1>
        <h1 className="bottom-txt">trust</h1>
      </div>
      <div ref={heroImg} className="hero-img">
        <img src={building} fill={true} alt="building" />
      </div>
      <motion.div
        className="hero-desc"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false }} // Ensures it animates only once
      >
        <p>
          At Hometrust Living Ltd, Our portfolio is a testament to our
          commitment to quality, innovation, and trust. Every project we
          undertake reflects our dedication to creating spaces that are not only
          aesthetically pleasing but also built to stand the test of time.
        </p>
      </motion.div>
      <motion.section
        className="video-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false }} // Ensures it animates only once
      >
        <div className="vid-marq-wrapper">
          <MarqueeText />
          <MarqueeTextMobile />

          <motion.div
            className="video-container"
            ref={videoContainerRef}
            style={{
              scale, // This will scale the entire container
              width: 'min(952px, 90vw)',
              height: 'auto',
              margin: '0 auto', // Center if needed
              transformOrigin: 'center top', // Scale from the top center
            }}>
            <video
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
              autoPlay
              loop
              muted
              playsInline>
              <source
                src="https://cms.shantaholdings.com/media/media/SHL_Final_Without_Super-28.02.24_2.mp4"
                type="video/mp4"
              />
            </video>
          </motion.div>
        </div>
        <FloatImg imageUrl={building} altText="building" />
      </motion.section>

      <Carousel images={realEstate} videos={videos} />
      <section className="building-section">
        <StatsSection />
      </section>
      <MapSection />
      <LetsConnect />
    </>
  );
};

export default Home;
