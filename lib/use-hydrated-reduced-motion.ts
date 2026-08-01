'use client'

import { useReducedMotion } from 'motion/react'
import { useSyncExternalStore } from 'react'

const subscribeToHydration = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion()
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  )

  return isHydrated && Boolean(prefersReducedMotion)
}
