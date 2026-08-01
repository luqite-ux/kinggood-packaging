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

export function getHeroCarouselMotion(reduceMotion: boolean) {
  if (reduceMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0 },
    }
  }

  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: 'easeInOut' as const },
  }
}

export function getHeroCarouselBackgroundMotion(reduceMotion: boolean) {
  if (reduceMotion) {
    return {
      initial: false as const,
      animate: { scale: 1 },
      transition: { duration: 0 },
    }
  }

  return {
    initial: { scale: 1.06 },
    animate: { scale: 1 },
    transition: { duration: 6, ease: [0.22, 1, 0.36, 1] as const },
  }
}
