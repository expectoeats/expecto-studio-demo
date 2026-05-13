// Motion One variants (not Framer Motion)
export const springReveal = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: "spring" as const, stiffness: 120, damping: 20 },
};

export const clipWipe = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: { clipPath: "inset(0 0% 0 0)" },
  transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
};

export const staggerFadeUp = (i: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.08, duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
});

export const scatterLetters = {
  hover: (i: number) => ({
    x: (Math.random() - 0.5) * 16,
    y: (Math.random() - 0.5) * 10,
    rotate: (Math.random() - 0.5) * 16,
    transition: { type: "spring" as const, stiffness: 300, damping: 15, delay: i * 0.02 },
  }),
  rest: {
    x: 0, y: 0, rotate: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  },
};
