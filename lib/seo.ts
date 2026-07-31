export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://kinggoodpackaging.com').replace(/\/$/, '')

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString()
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
