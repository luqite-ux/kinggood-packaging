export type HeroSlide = Readonly<{
  src: '/factory-exterior.png' | '/factory-production.png'
  altKey: 'factoryExterior' | 'factoryProduction'
}>

export const HERO_SLIDES = Object.freeze([
  Object.freeze({ src: '/factory-exterior.png', altKey: 'factoryExterior' }),
  Object.freeze({ src: '/factory-production.png', altKey: 'factoryProduction' }),
] satisfies readonly HeroSlide[])

export type HeroInteractionState = Readonly<{
  pointerInside: boolean
  focusWithin: boolean
}>

export type HeroInteractionAction = Readonly<{
  type: 'pointer-enter' | 'pointer-leave' | 'focus-enter' | 'focus-leave'
}>

export const INITIAL_HERO_INTERACTION_STATE: HeroInteractionState = Object.freeze({
  pointerInside: false,
  focusWithin: false,
})

export function reduceHeroInteraction(
  state: HeroInteractionState,
  action: HeroInteractionAction,
): HeroInteractionState {
  switch (action.type) {
    case 'pointer-enter':
      return { ...state, pointerInside: true }
    case 'pointer-leave':
      return { ...state, pointerInside: false }
    case 'focus-enter':
      return { ...state, focusWithin: true }
    case 'focus-leave':
      return { ...state, focusWithin: false }
  }
}

export function isHeroInteractionPaused(state: HeroInteractionState) {
  return state.pointerInside || state.focusWithin
}

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
