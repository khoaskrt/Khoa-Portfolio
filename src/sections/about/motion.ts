export const aboutMotion = {
  ease: {
    expoOut: 'power4.out',
    quartOut: 'power3.out',
  },
  intro: {
    y: 24,
    duration: 0.9,
    stagger: 0.1,
  },
  orb: {
    scrub: 1.5,
    ranges: [
      { from: 40, to: -36 },
      { from: 52, to: -48 },
      { from: 32, to: -28 },
    ] as const,
  },
  title: {
    stickyTop: 'clamp(6rem, 10vw, 10rem)',
  },
  snapList: {
    scrub: true,
    dimOpacity: 0.2,
    dimScale: 0.8,
    stagger: 0.5,
  },
} as const;
