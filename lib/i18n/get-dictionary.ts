import type { Locale } from './config'
import type { Dictionary } from './types'

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case 'zh':
      return (await import('./dictionaries/zh')).default
    case 'de':
      return (await import('./dictionaries/de')).default
    case 'es':
      return (await import('./dictionaries/es')).default
    case 'en':
    default:
      return (await import('./dictionaries/en')).default
  }
}
