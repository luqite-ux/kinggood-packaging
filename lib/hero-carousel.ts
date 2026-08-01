export type HeroSlide = Readonly<{
  src: '/factory-exterior.png' | '/factory-production.png'
  altKey: 'factoryExterior' | 'factoryProduction'
}>

export const HERO_SLIDES = Object.freeze([
  Object.freeze({ src: '/factory-exterior.png', altKey: 'factoryExterior' }),
  Object.freeze({ src: '/factory-production.png', altKey: 'factoryProduction' }),
] satisfies readonly HeroSlide[])

export function formatSlideLabel(template: string, index: number) {
  return template.replace('{slide}', String(index + 1))
}

function validCount(count: number) {
  return Number.isInteger(count) && count > 0
}

export function nextSlide(index: number, count: number) {
  if (!validCount(count)) return 0
  return ((index % count) + count + 1) % count
}

export function previousSlide(index: number, count: number) {
  if (!validCount(count)) return 0
  return ((index % count) + count - 1) % count
}
