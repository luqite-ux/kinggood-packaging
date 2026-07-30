export function getHeroBackgroundMotion(reduceMotion: boolean) {
  if (reduceMotion) {
    return {
      initial: false as const,
      animate: { scale: 1 },
      transition: { duration: 0 },
    }
  }

  return {
    initial: { scale: 1.1 },
    animate: { scale: 1 },
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as const },
  }
}
