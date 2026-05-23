export const momentRecapMotion = {
  ease: {
    expoOut: 'power4.out',
    quartOut: 'power3.out',
    quadOut: 'power2.out',
  },
  intro: {
    y: 24,
    duration: 0.9,
    stagger: 0.1,
  },
  splitText: {
    y: 60,
    duration: 0.9,
    stagger: 0.025,
  },
  imageZoom: {
    from: 1.15,
    to: 1.0,
  },
  cascade: {
    numberDuration: 0.6,
    ruleDuration: 0.7,
    descY: 16,
    descDuration: 0.7,
  },
  scrub: 2.5,
} as const;
