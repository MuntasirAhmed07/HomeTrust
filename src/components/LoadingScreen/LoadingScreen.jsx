import { motion } from 'framer-motion';
import Logo from '../../assets/logo';
import CountUp from '../Countup/Countup';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => (
  <motion.div
    className="loading-screen"
    exit={{ y: '-100%' }}
    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
    <div className="loading-logo">
      <Logo />
    </div>
    <div className="loading-counter">
      <CountUp
        from={0}
        to={100}
        direction="up"
        duration={1.5}
        decimals={0}
        className="loading-number"
        onEnd={onComplete}
      />
      <span className="loading-suffix">%</span>
    </div>
  </motion.div>
);

export default LoadingScreen;
