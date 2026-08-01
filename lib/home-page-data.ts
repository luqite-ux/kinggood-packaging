import type { Product } from './site.ts'
import type { Locale } from './i18n/config.ts'
import type { Dictionary } from './i18n/types.ts'
import { getDictionary } from './i18n/get-dictionary.ts'
import { fetchProductsData } from './products-db.ts'

type HomePageDataDependencies = {
  getDictionary: (locale: Locale) => Promise<Dictionary>
  fetchProductsData: (locale: Locale) => Promise<Product[]>
}

const defaultDependencies: HomePageDataDependencies = {
  getDictionary,
  fetchProductsData,
}

export async function loadHomePageData(
  locale: Locale,
  dependencies: HomePageDataDependencies = defaultDependencies,
) {
  const [dictionary, products] = await Promise.all([
    dependencies.getDictionary(locale),
    dependencies.fetchProductsData(locale),
  ])

  return { dictionary, products }
}
