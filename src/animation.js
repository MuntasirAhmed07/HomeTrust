export const background = {
  initial: {
    width: 0,
  },
  enter: {
    width: '100vh',
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35 },
  },
};

export const stack = {
  enter: (direction) => ({
    y: direction > 0 ? '100%' : '-100%', // Move in from right or left
    opacity: 1,
  }),
  center: {
    y: '0%',
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.8 },
  },
  exit: (direction) => ({
    y: direction > 0 ? '-100%' : '100%', // Move out while next one enters
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.8 },
  }),
};

export const stackTwo = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%', // Move in from right or left
    opacity: 1,
  }),
  center: {
    x: '0%',
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.8 },
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%', // Move out while next one enters
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.8 },
  }),
};

export const opacity = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.35 } },
  closed: { opacity: 0, transition: { duration: 0.35 } },
};

export const menuSlide = {
  initial: {
    x: '100%',
  },
  enter: {
    x: '0%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const menuSlideTop = {
  initial: {
    y: '-100%',
  },
  enter: {
    y: '0%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    y: '-100%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const Slide = {
  initial: {
    x: '80px',
  },
  enter: {
    x: '0px',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: '80px',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};
